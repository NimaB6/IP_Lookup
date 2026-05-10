# 🖥️ Server Monitoring Platform

A real-time server monitoring platform built with FastAPI and React. Keep an eye on your infrastructure — CPU, memory, disk, network — all from one clean dashboard, live.

---

## 🚀 Getting started

Make sure you have Python 3.11+, Node.js 18+ and Docker installed, then:

```bash
git clone https://github.com/NimaB6/server-monitoring-platform-.git
cd server-monitoring-platform-
cp .env.example .env
docker compose up -d
```

That's it — the app runs at `http://localhost:3000`. 🎉

---

## ✨ What it does

- 📡 **Live metrics** — real-time CPU, RAM, disk and network stats via WebSockets
- 🖥️ **Multi-server** — watch all your machines from one place
- 🔔 **Alerts** — set thresholds and get notified when things go sideways
- 📊 **History** — browse past metrics with interactive charts
- 🔐 **Auth** — JWT-based login with role management
- 📄 **API docs** — auto-generated Swagger UI at `/docs`

---

## 👥 Authors

- **Nima Bahrami** — [@NimaB6](https://github.com/NimaB6)
- **Sobhan Haerizadeh** — [@Sobhanhaerizadeh](https://github.com/Sobhanhaerizadeh)

---