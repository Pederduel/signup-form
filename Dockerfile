FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn ./.mvn

RUN ./mvnw dependency:go-offline -B

COPY src ./src

RUN ./mvnw package -DskipTests

FROM eclipse-temurin:17-jre-alpine

RUN apk add --no-cache sqlite

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

VOLUME /app/data

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]