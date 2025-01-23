# Baaspilt (OpenJDK koos JRE-ga)
FROM openjdk:17-jdk-slim

# Määrame töökausta konteineris
WORKDIR /app

# Kopeerime jar-faili konteinerisse
COPY target/veebipood-0.0.1-SNAPSHOT.jar app.jar

# Määrame käivitatava käsu
ENTRYPOINT ["java", "-jar", "app.jar"]