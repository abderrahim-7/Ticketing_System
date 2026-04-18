# Authentication Service Backend

This is a Spring Boot-based authentication service that provides user registration, login, password reset, and profile management functionalities. It uses JWT for authentication, MySQL for data persistence, Redis for caching, and email services for notifications.

## Features

- User registration with email verification
- User login with JWT token generation
- Password reset via email
- User profile retrieval
- Secure authentication using Spring Security
- Email notifications for verification and password reset

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+
- Gmail account for email services (or configure another SMTP provider)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Configure the database:**
   - Create a MySQL database named `test`.
   - Update the database credentials in `src/main/resources/application.properties`:
     ```
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```

3. **Configure Redis:**
   - Ensure Redis is running on localhost:6379 (default).

4. **Configure email service:**
   - Use a Gmail account.
   - Enable 2-Step Verification on your Gmail account.
   - Generate an App Password:
     - Go to [Google Account settings](https://myaccount.google.com/).
     - Select "Security" > "Signing in to Google" > "App passwords".
     - Generate a password for "Mail" (this will give you a 16-character password like `mjez wugc ilkn ztsa`).
   - Update `application.properties`:
     ```
     spring.mail.username=your-gmail@gmail.com
     spring.mail.password=your-app-password
     ```

5. **Set environment variables (optional):**
   - `FRONTEND_URL`: URL of the frontend application (default: http://localhost:45678).
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: For admin user creation.

## Build and Run

1. **Build the project:**
   ```bash
   ./mvnw clean compile
   ```

2. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## API Endpoints

### Authentication

#### POST /register
Registers a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "USER"
}
```

**Response (200 OK):**
```json
{
  "message": "User registered successfully. Please check your email for verification.",
  "email": "user@example.com",
  "id": 1,
  "success": true
}
```

**Response (400 Bad Request):** Error message if registration fails.

#### GET /verify
Verifies user email using token.

**Query Parameters:**
- `token`: Verification token sent via email.

**Response (200 OK):** "Email verified successfully."

**Response (400 Bad Request):** "Invalid or expired token."

#### POST /login
Logs in a user and returns JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "token": "jwt-token-here"
}
```

**Response (401 Unauthorized):** "Invalid credentials."

### Password Management

#### POST /forget-password
Sends password reset email.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response (200 OK):** "Password reset email sent."

**Response (400 Bad Request):** "Email not found."

#### GET /validate-reset-token
Validates reset token.

**Query Parameters:**
- `token`: Reset token.

**Response (200 OK):** "Token is valid."

**Response (400 Bad Request):** "Invalid or expired token."

#### POST /reset-password
Resets user password.

**Request Body:**
```json
{
  "token": "string",
  "newPassword": "string"
}
```

**Response (200 OK):** "Password reset successfully."

**Response (400 Bad Request):** "Invalid token or password."

### User Profile

#### GET /profil
Retrieves user profile.

**Query Parameters:**
- `id`: User ID.

**Headers:**
- `Authorization`: Bearer {jwt-token}

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "password": "hashed-password",
  "isEnabled": true,
  "role": "USER"
}
```

**Response (401 Unauthorized):** If not authenticated.

**Response (404 Not Found):** If user not found.

## Configuration

The application uses `application.properties` for configuration. **Do not commit this file** as it contains sensitive information. Use `application-local.properties` for local overrides.

Key configuration properties:

- `server.port`: Server port (8080)
- `spring.datasource.*`: MySQL database settings
- `spring.data.redis.*`: Redis settings
- `spring.mail.*`: Gmail SMTP settings
- `frontend.url`: Frontend URL
- `jwt.secret`: JWT signing secret
- `jwt.expiration`: JWT expiration time (3600000 ms)
- `admin.email` & `admin.password`: Admin credentials

## Security

- Uses Spring Security for authentication and authorization.
- JWT tokens are required for protected endpoints.
- Passwords are securely hashed.
- CORS is configured for frontend integration.

## Dependencies

- Spring Boot Starter Web
- Spring Boot Starter Security
- Spring Boot Starter Data JPA
- Spring Boot Starter Data Redis
- Spring Boot Starter Mail
- MySQL Connector/J
- JJWT (JSON Web Tokens)
- Lombok

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run tests.
5. Submit a pull request.

## License

This project is licensed under [License Name] - see the LICENSE file for details.