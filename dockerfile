# Setze das Basis-Image auf mongo
FROM mongo

# Kopiere die Datei data.json nach data/data.json
COPY Pokemon.json data/Pokemon.json

# Kopiere das Skript script.sh nach docker-entrypoint-initdb.d/script.sh
COPY script.sh docker-entrypoint-initdb.d/script.sh

# Ändere die Berechtigungen des Skripts script.sh auf ausführbar
RUN chmod +x /docker-entrypoint-initdb.d/script.sh

# Öffne den Port 27017 für den Container
EXPOSE 27017