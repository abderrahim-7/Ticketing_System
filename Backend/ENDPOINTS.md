API Endpoints
=============

This document lists available REST endpoints, expected inputs (path/query/body), and responses.

Notes:
- Endpoints that require authentication read the user id from the JWT in the request (see `JWTUtil`). Include the `Authorization: Bearer <token>` header when required.
- DTO names refer to classes under `src/main/java/com/example/demo/dto`.

1) User / Authentication
------------------------
- POST /register
  - Body: JSON Agent (entity fields: username, email, password, role (USER|AGENT), phoneNumber, departement, jobTitle, and if role=AGENT include `categories` and `skills`)
  - Response: `RegisterResponse` { message, email, id, success }

API Endpoints — UserController
==============================

This file lists every endpoint implemented in `UserController` and gives exact HTTP method, URL, required headers, the JSON or query param shape to send from Postman, and example responses.

General notes
- Protected endpoints require header: `Authorization: Bearer <jwt>` (see `SecurityConfig` — unauthenticated: `/register`, `/login`, `/verify`, `/forget-password`, `/reset-password`, `/validate-reset-token`).

1) Public / Auth
-----------------

- POST /register
  - Description: create a new user or agent.
  - Headers: none
  - Body (application/json): an `Agent`/`User` JSON. Minimal example for a regular user:
    {
      "username": "alice",
      "email": "alice@example.com",
      "password": "Secret123",
      "phoneNumber": "+33123456789",
      "departement": "Support",
      "jobTitle": "Client",
      "role": "USER"
    }
    If creating an agent, include `role":"AGENT"` and optionally `categories` and `skills` arrays (IDs or objects depending on server expectations):
    {
      "username":"bob",
      "email":"bob@company.com",
      "password":"Secret123",
      "role":"AGENT",
      "categories": [1,2],
      "skills": [3]
    }
  - Response (application/json) `RegisterResponse`:
    { "message": "...", "email": "alice@example.com", "id": 12, "success": true }

- GET /verify?token={token}
  - Description: confirm account via token sent by email.
  - Query: `token` (string)
  - Headers: none
  - Response: plain text (e.g. "Account enabled")

- POST /forget-password
  - Description: request password-reset email.
  - Headers: none
  - Body (application/json):
    { "email": "alice@example.com" }
  - Response: plain text (info message)

- GET /validate-reset-token?token={token}
  - Description: quick check whether a reset token is valid.
  - Query: `token` (string)
  - Response: plain text (e.g. "valid" or error message)

- POST /reset-password
  - Description: complete password reset using token.
  - Headers: none
  - Body (application/json):
    { "token": "<reset-token>", "newPassword": "NewSecret123" }
  - Response: plain text (status)

- POST /login
  - Description: authenticate and receive JWT.
  - Headers: none
  - Body (application/json):
    { "email": "alice@example.com", "password": "Secret123" }
  - Response (application/json) `LoginResponse`:
    { "id": 12, "email": "alice@example.com", "token": "<jwt-token>" }

2) User (authenticated)
------------------------

All endpoints below require `Authorization: Bearer <token>`.

- GET /user/tickets?page={page}&limit={limit}
  - Description: list tickets created by the authenticated user.
  - Query params: `page` (int), `limit` (int)
  - Example request (GET): `/user/tickets?page=0&limit=10`
  - Response (application/json): array of `TicketResponse` objects. Example item:
    {
      "id": 5,
      "title": "Cannot login",
      "description": "Details...",
      "category": "Authentication",
      "user": "alice@example.com",
      "agent": null,
      "status": "OPEN"
    }

- POST /user/tickets
  - Description: create a ticket for the authenticated user.
  - Headers: `Authorization: Bearer <token>`
  - Parameters: the controller expects `@RequestParam` for these values (so send them as query params or as `x-www-form-urlencoded` body in Postman):
    - `title` (string)
    - `categoryId` (number)
    - `description` (string)
  - Example (query-style): `POST /user/tickets?title=Help&categoryId=1&description=Details`
  - Example (x-www-form-urlencoded body): set keys `title`, `categoryId`, `description`.
  - Response (application/json) `TicketResponse` (the created ticket)

- GET /user/profile
  - Description: get profile of the authenticated user.
  - Headers: `Authorization: Bearer <token>`
  - Response (application/json) `UserProfileResponse`:
    { "username":"alice","email":"alice@example.com","phoneNumber":"...","departement":"...","jobTitle":"...","lastLogin":"2024-01-01T12:00:00" }

- POST /user/profile
  - Description: update profile. Controller accepts a `UserProfileResponse` object in the body.
  - Headers: `Authorization: Bearer <token>`
  - Body (application/json): send fields to update, example:
    { "username":"alice2","email":"alice@example.com","phoneNumber":"+33123456789","departement":"Support","jobTitle":"Client" }
  - Response: plain text (status message)

- GET /user/statistics
  - Description: get basic user statistics.
  - Headers: `Authorization: Bearer <token>`
  - Response (application/json) `UserStatisticsResponse`:
    { "totalTicketsSubmitted": 10, "totalAcceptedTickets": 4, "acceptanceRate": 0.4 }

- PUT /user/change-password
  - Description: change the authenticated user's password.
  - Note: controller signature uses two `@RequestBody` Strings which is invalid; the intended payload is an object with old and new passwords. Send as below.
  - Headers: `Authorization: Bearer <token>`
  - Body (application/json):
    { "oldPassword": "OldSecret123", "newPassword": "NewSecret123" }
  - Response: plain text (status)

3) Quick Postman tips
---------------------

- To test protected endpoints in Postman:
  1) Call `POST /login` with JSON credentials.
  2) Copy the `token` from the `LoginResponse`.
  3) Add header `Authorization: Bearer <token>` to following requests.

- Example `curl` for login:

```bash
curl -X POST http://localhost:8080/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"Secret123"}'
```

If you want, I can now:
- Add `curl` or Postman-ready examples for every endpoint above.
- Fix the `change-password` controller signature to accept a single JSON body (requires a small code patch).

File with the controller: [Backend/src/main/java/com/example/demo/controller/UserController.java](Backend/src/main/java/com/example/demo/controller/UserController.java#L1-L200)

  - Body: array/set of `Category` objects (or JSON with category ids/names)
  - Response: boolean

- GET /agent/statistics
  - Headers: `Authorization: Bearer <token>`
  - Response: `AgentStatisticsResponse`

- GET /agent/tickets?page={page}&limit={limit}
  - Headers: `Authorization: Bearer <token>`
  - Response: `List<TicketResponse>`

- PUT /agent/tickets/{ticketId}
  - Headers: `Authorization: Bearer <token>`
  - Path: `ticketId`
  - Action: marks ticket as solved
  - Response: 200 OK (empty body)

4) Admin (general admin endpoints)
----------------------------------
- PUT /admin/agent/{id}/activate
  - Path: `id` (agent id)
  - Response: JSON map { "agentId": <id> }

- PUT /admin/account/{id}/disable
  - Path: `id` (user or agent id)
  - Response: JSON map { "message": "user disabled"|"agent disabled", "id": "<id>" }

- PUT /admin/tickets/{ticketId}/assign/{agentId}
  - Path: `ticketId`, `agentId`
  - Response: JSON map { "message": "ticket assigned", "agentId": "...", "ticketId": "..." }

- PUT /admin/tickets/{ticketId}/refuse
  - Path: `ticketId`
  - Response: JSON map { "message": "ticket refused", "ticketId": "..." }

- GET /admin/tickets
  - Response: `List<TicketResponse>`

- GET /admin/agents
  - Response: `List<AgentProfileResponse>`

- GET /admin/users
  - Response: `List<UserProfileResponse>`

5) Category management (admin)
------------------------------
Base path: /admin/categories

- GET /admin/categories/?page={page}&limit={limit}
  - Response: `List<CategoryResponse>`

- GET /admin/categories/{id}
  - Response: `CategoryResponse`

- POST /admin/categories/
  - Body: `Category` entity (name, description)
  - Response: `CategoryResponse`

- PUT /admin/categories/{id}
  - Body: plain String (new description)
  - Response: `CategoryResponse` (updated)

- POST /admin/categories/delete/{id}
  - Path: id
  - Response: plain String message

6) Skill management (admin)
---------------------------
Base path: /admin/skills

- GET /admin/skills/?page={page}&limit={limit}
  - Response: `List<SkillResponse>`

- GET /admin/skills/{id}
  - Response: `SkillResponse`

- POST /admin/skills/
  - Body: `Skill` entity
  - Response: `SkillResponse`

- POST /admin/skills/delete/{id}
  - Path: id
  - Response: plain String message


Examples
--------
- Login request body:
  {
    "email": "alice@example.com",
    "password": "secret"
  }

- Create ticket (user): send as POST query params (or adjust to JSON in client):
  POST /user/tickets?title=Help&categoryId=1&description=Details
  (Requires Authorization header)

Files with DTOs to consult:
- `src/main/java/com/example/demo/dto/TicketResponse.java`
- `src/main/java/com/example/demo/dto/Agent/AgentProfileResponse.java`
- `src/main/java/com/example/demo/dto/User/UserProfileResponse.java`
- `src/main/java/com/example/demo/dto/RegisterResponse.java`
- `src/main/java/com/example/demo/dto/LoginRequest.java`
- `src/main/java/com/example/demo/dto/LoginResponse.java`

If you want, I can also:
- Add example `curl` commands for each endpoint.
- Add request/response JSON examples for all DTOs.


