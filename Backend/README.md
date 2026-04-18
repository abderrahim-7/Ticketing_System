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
   - Create a MySQL database named `test` (or update `application.properties` accordingly).
   - Update the database credentials in `src/main/resources/application.properties`:
     ```
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```

3. **Configure Redis:**
   - Ensure Redis is running on localhost:6379 (default configuration).
   - If using a different host/port, update `application.properties`.

4. **Configure email service:**
   - Update the email credentials in `application.properties`:
     ```
     spring.mail.username=your-email@gmail.com
     spring.mail.password=your-app-password
     ```
   - For Gmail, use an app password instead of your regular password.

5. **Set environment variables (optional):**
   - `FRONTEND_URL`: URL of the frontend application for CORS and email links.

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

- **POST /register**
  - Registers a new user.
  - Request Body: `User` object (JSON)
  - Response: `RegisterResponse`

- **GET /verify**
  - Verifies user email using token.
  - Query Param: `token`
  - Response: Success message

- **POST /login**
  - Logs in a user and returns JWT token.
  - Request Body: `LoginRequest` (JSON)
  - Response: `LoginResponse` with JWT token

### Password Management

- **POST /forget-password**
  - Sends password reset email.
  - Request Body: `ForgetPasswordRequest` (JSON)
  - Response: Success message

- **GET /validate-reset-token**
  - Validates reset token.
  - Query Param: `token`
  - Response: Validation message

- **POST /reset-password**
  - Resets user password.
  - Request Body: `ResetPasswordRequest` (JSON)
  - Response: Success message

### User Profile

- **GET /profil**
  - Retrieves user profile.
  - Query Param: `id` (user ID)
  - Response: `User` object
  - Requires authentication (JWT token in header)

## Configuration

The application uses `application.properties` for configuration. **Do not commit this file** as it may contain sensitive information. Instead, use environment variables or `application-local.properties` for local development.

Key configuration properties:

- `spring.application.name`: Application name (e.g., demo)
- `spring.profiles.active`: Active Spring profile (e.g., local)
- `server.port`: Server port (default: 8080)
- `spring.datasource.url`: JDBC URL for MySQL database (e.g., jdbc:mysql://localhost:3306/test)
- `spring.datasource.username`: Database username
- `spring.datasource.password`: Database password (use environment variable: SPRING_DATASOURCE_PASSWORD)
- `spring.jpa.hibernate.ddl-auto`: Hibernate DDL auto mode (e.g., update)
- `spring.jpa.show-sql`: Show SQL queries in logs (true/false)
- `spring.data.redis.host`: Redis host (e.g., localhost)
- `spring.data.redis.port`: Redis port (e.g., 6379)
- `spring.mail.host`: SMTP host (e.g., smtp.gmail.com)
- `spring.mail.port`: SMTP port (e.g., 587)
- `spring.mail.username`: Email username (use environment variable: SPRING_MAIL_USERNAME)
- `spring.mail.password`: Email password/app password (use environment variable: SPRING_MAIL_PASSWORD)
- `spring.mail.properties.mail.smtp.auth`: Enable SMTP auth (true/false)
- `spring.mail.properties.mail.smtp.starttls.enable`: Enable STARTTLS (true/false)
- `frontend.url`: Frontend application URL (use environment variable: FRONTEND_URL)
- `jwt.secret`: JWT signing secret key (use environment variable: JWT_SECRET)
- `jwt.expiration`: JWT token expiration time in milliseconds (e.g., 3600000)

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