# 🔍 IP lookup

<img width="2551" height="954" alt="image" src="https://github.com/user-attachments/assets/ea4d61a6-faee-4ca7-a185-ee81c94585a9" />
<img width="2549" height="900" alt="image" src="https://github.com/user-attachments/assets/fefccbe4-6814-4e0d-b141-ad5c94502189" />

🌐 Gib eine Domain ein und finde sofort die IP-Adresse heraus.
Gebaut mit FastAPI im Backend und purem HTML, CSS und JavaScript im Frontend — schnell, minimalistisch und direkt. ⚡


---

## 🚀 Installation & Start
Stelle sicher, dass Python 3.11+ installiert ist, dann:
```bash
git clone https://github.com/NimaB6/IP_Lookup.git
cd IP_Lookup

# Abhängigkeiten installieren
pip install -r requirements.txt

# Server starten
uvicorn main:app --reload --port 5500
```
Die App läuft dann unter `http://localhost:5500`. 🎉

---
## ✨ Features

- 🔍 **IP-Abfrage** — Domain eingeben und sofort die IP-Adresse erhalten
- ⚡ **Rate Limiting** — maximal 3 Anfragen, dann 5 Sekunden Cooldown
- 🌍 **Mehrsprachig** — Deutsch und Englisch (DE / EN)
- 🎨 **Modernes Design** — dunkles Theme mit Animationen
- 📱 **Responsive** — funktioniert auf Desktop und Handy
- ⌨️ **Enter-Taste** — Suche auch per Tastatur möglich
- ❌ **Fehlerbehandlung** — klare Fehlermeldung bei ungültiger URL oder nicht erreichbarer API
- 🧹 **URL-Bereinigung** — `https://` wird automatisch entfernt

---

## 🛠️ Technologien
**Backend**
- Python 3.11+
- FastAPI
- Uvicorn

**Frontend**
- HTML / CSS / JavaScript
- SweetAlert2

---
## 👥 Autoren
- **Nima Bahrami** — [@NimaB6](https://github.com/NimaB6)
- **Sobhan Haerizadeh** — [@Sobhanhaerizadeh](https://github.com/Sobhanhaerizadeh)


© 2025–2026 · Made with ♥