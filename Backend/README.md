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

- Docker and Docker Compose
- A Gmail account with App Password generated

## Getting Started

### Step 1: Obtain a Gmail Account

If you don't already have a Gmail account, follow these steps:

1. Go to [Gmail Sign Up](https://accounts.google.com/signup)
2. Fill in your personal information (first name, last name)
3. Create a username (your Gmail address)
4. Create a strong password
5. Verify your phone number
6. Accept Google's Terms of Service and Privacy Policy
7. Complete the setup

### Step 2: Generate Gmail App Password

This application uses Gmail to send emails (for verification and password reset). You need to generate an App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled):
   - Click "2-Step Verification"
   - Follow the prompts to add your phone number
4. After 2-Step Verification is enabled, go back to **Security**
5. Scroll down and find **App passwords** section
6. Select **Mail** as the app and **Windows (or your operating system)** as the device
7. Google will generate a 16-character password (example: `mjez wugc ilkn ztsa`)
8. Copy this password and save it safely

### Step 3: Configure Environment Variables

1. Navigate to the `Backend` folder
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file with your Gmail credentials:
   ```
   MAIL_USERNAME=your-gmail@gmail.com
   MAIL_PASSWORD=mjez wugc ilkn ztsa  # Your 16-character app password
   ```

### Step 4: Run the Application with Docker

Make sure you're in the root directory of the project (where `docker-compose.yml` is located).

1. **Start all services (Backend, MySQL, Redis):**
   ```bash
   docker-compose up
   ```

   The application will be available at: `http://localhost:8080`

2. **Stop all services:**
   ```bash
   docker-compose down
   ```

3. **Run in detached mode (background):**
   ```bash
   docker-compose up -d
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f backend
   ```

### Services Included

- **Backend**: Spring Boot application running on port 8080
- **MySQL**: Database service on port 3307 (maps to 3306 inside container)
- **Redis**: Cache service on port 6379

## API Endpoints

### POST /register
Create a new user account.

Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "USER"
}
```

Response (200 OK):
```json
{
  "message": "User registered successfully. Please check your email for verification.",
  "email": "user@example.com",
  "id": 1,
  "success": true
}
```

### GET /verify
Verify a user email using the token sent by email.

Query parameters:
- `token`: verification token

Response (200 OK):
```
Email verified successfully.
```

### POST /login
Authenticate a user and return a JWT token.

Request body:
```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 OK):
```json
{
  "id": 1,
  "email": "user@example.com",
  "token": "jwt-token-here"
}
```

### POST /forget-password
Send a password reset email to the given address.

Request body:
```json
{
  "email": "string"
}
```

Response (200 OK):
```
Password reset email sent.
```

### GET /validate-reset-token
Check whether a password reset token is valid.

Query parameters:
- `token`: reset token

Response (200 OK):
```
Token is valid.
```

### POST /reset-password
Reset the user password using a valid reset token.

Request body:
```json
{
  "token": "string",
  "newPassword": "string"
}
```

Response (200 OK):
```
Password reset successfully.
```

### GET /profil
Retrieve a user profile by user ID.

Query parameters:
- `id`: user ID

Headers:
- `Authorization: Bearer {jwt-token}`

Response (200 OK):
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

Response (401 Unauthorized): If the JWT token is missing or invalid.
Response (404 Not Found): If the user ID does not exist.

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