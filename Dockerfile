FROM eclipse-temurin:17-jdk-alpine AS build

# Set working directory
WORKDIR /app

# Copy Maven files first (for better caching)
COPY ./backend/pom.xml .
COPY ./backend/mvnw .
COPY ./backend/.mvn ./.mvn

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY ./backend/src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Runtime image
FROM eclipse-temurin:17-jre-alpine

# Install SQLite
RUN apk add --no-cache sqlite

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Volume for database
VOLUME /app/data

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]