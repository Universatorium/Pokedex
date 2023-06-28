import json

# JSON-Datei öffnen und Daten laden
with open('Pokemon.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Zusätzliche Information hinzufügen
i=1
for i, entry in enumerate(data, start=1):
    entry['ID'] = i
    # bildname = f"{i:03}.png"
    # entry['Bild'] = bildname

# Aktualisierte Daten in die JSON-Datei schreiben
with open('Pokemon.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)