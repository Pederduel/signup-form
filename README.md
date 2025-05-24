# signup-form

# Setup
## Prerequisites
- Docker and Docker Compose
- Node.js 18+ and Yarn (or npm)
- Java 17 (if running without Docker)
- Maven (if running without Docker)

In the root directory run `docker-compose up -d --build` to start the backend server onm port 8080.

Navigate to the frontend folder and run `yarn install` and then `yarn dev` to start the frontend at [http://localhost:3000]().

### To change the date of the signup form go to [DataInitializer](src\main\java\club\signup\signup_form\utils\DataInitializer.java) and change the `registrationDate`
