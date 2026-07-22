# Sona Tower Guest WiFi Registration Portal

Production-quality guest WiFi registration web application for Sona Tower.

## Architecture

```
React (Vite + Tailwind)  →  Express REST API  →  Microsoft SQL Server
```

## Project Structure

```
guest-portal/
├── frontend/     React SPA
├── backend/      Express API
├── database/     SQL Server scripts
└── docs/         API documentation
```

## Prerequisites

- Node.js 20+
- Microsoft SQL Server 2016+
- npm

## Quick Start

### 1. Database

Run the SQL script:

```bash
# Execute in SQL Server Management Studio or sqlcmd
database/001_create_visitor_registrations.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your SQL Server credentials
npm install
npm run dev
```

API runs at `http://localhost:3001`

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Portal runs at `http://localhost:5173`

## Production Build

```bash
# Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend
cd backend
npm install --production
NODE_ENV=production npm start
```

## Environment Variables

See `backend/.env.example` and `frontend/.env.example`.

## Features

- Premium Sona Tower branded UI with building hero background
- CNIC and Pakistani phone validation
- Duplicate CNIC prevention (same day, PKT)
- Input sanitization and parameterized SQL
- Rate limiting, helmet, CORS
- Structured logging
- RESTful API with documentation

## API Documentation

See [docs/API.md](docs/API.md)

## License

Proprietary — Fauji Fertilizer Company Limited
