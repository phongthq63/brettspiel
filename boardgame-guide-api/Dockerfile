FROM maven:3.9.9-amazoncorretto-21 as builder
WORKDIR /app

COPY pom.xml .
COPY common/pom.xml ./common/pom.xml
COPY common-socket/pom.xml ./common-socket/pom.xml
COPY boardgame-guide-gateway/pom.xml ./boardgame-guide-gateway/pom.xml
COPY boardgame-guide-socket/pom.xml ./boardgame-guide-socket/pom.xml
COPY boardgame-guide-splendor/pom.xml ./boardgame-guide-splendor/pom.xml

RUN mvn clean install --fail-never -N -Dmaven.test.skip=true

COPY . .

RUN mvn clean package -Dmaven.test.skip=true

FROM amazoncorretto:21-alpine3.20

WORKDIR /app

COPY --from=builder /app/boardgame-guide-gateway/target/boardgame-guide-gateway-1.0-SNAPSHOT.jar boardgame-guide-gateway-1.0-SNAPSHOT.jar
COPY --from=builder /app/boardgame-guide-socket/target/boardgame-guide-socket-1.0-SNAPSHOT.jar boardgame-guide-socket-1.0-SNAPSHOT.jar
COPY --from=builder /app/boardgame-guide-splendor/target/boardgame-guide-splendor-1.0-SNAPSHOT.jar boardgame-guide-splendor-1.0-SNAPSHOT.jar


CMD ["sh", "-c", "source /vault/secrets/envs && java -jar call-center-cms-1.0-SNAPSHOT.jar"]