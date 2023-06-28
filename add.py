import json

# JSON-Datei öffnen und Daten laden
with open('pokemon2.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Zusätzliche Information hinzufügen
for i, entry in enumerate(data, start=21):
    entry['ID'] = i
    bildname = f"/public/images/{i:03}.png"
    entry['Bild'] = bildname

# Aktualisierte Daten in die JSON-Datei schreiben
with open('pokemon2.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)