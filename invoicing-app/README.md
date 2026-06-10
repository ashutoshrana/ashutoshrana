# Invoicing Application

A production-ready full-stack invoicing app with JWT authentication, client &
invoice management, status tracking, a dashboard, and PDF export.

## Tech Stack

- **Frontend:** React 18, React Router 6, Redux Toolkit, Material UI, Axios, jsPDF
- **Backend:** Node.js, Express, PostgreSQL (`pg`), JWT, bcryptjs
- **Infra:** Docker / docker-compose, Nginx

## Project Structure

```
invoicing-app/
├── backend/      # Express API (auth, clients, invoices, dashboard)
├── frontend/     # React + Vite SPA
└── docker-compose.yml
```

## Running with Docker (recommended)

```bash
cd invoicing-app
cp .env.example .env          # set DB_PASSWORD, JWT_SECRET, REFRESH_TOKEN_SECRET
docker compose up -d --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Postgres: localhost:5432

The schema in `backend/migrations/init.sql` is applied automatically on first
database startup.

## Running locally (without Docker)

### Backend

```bash
cd backend
npm install
cp .env.example .env          # fill in DB + JWT secrets
createdb invoicing_app        # or create it via psql
psql -d invoicing_app -f migrations/init.sql
npm run dev                   # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env          # VITE_API_URL defaults to http://localhost:5000/api
npm run dev                   # http://localhost:5173
```

Vite proxies `/api` to the backend in development (see `vite.config.js`).

## API Endpoints

### Auth
| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Current user |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/auth/change-password` | Change password |

### Clients
| Method | Path |
| ------ | ---- |
| GET/POST | `/api/clients` |
| GET/PUT/DELETE | `/api/clients/:id` |

### Invoices
| Method | Path |
| ------ | ---- |
| GET/POST | `/api/invoices` |
| GET/PUT/DELETE | `/api/invoices/:id` |
| PATCH | `/api/invoices/:id/status` |
| POST | `/api/invoices/:id/items` |
| DELETE | `/api/invoices/:invoiceId/items/:itemId` |

### Dashboard
| Method | Path |
| ------ | ---- |
| GET | `/api/dashboard/stats` |

## Security Notes

- Passwords hashed with bcrypt (12 rounds); never stored in plaintext.
- All data queries are parameterized (no string-built SQL).
- Auth endpoints are rate limited (20 requests / 15 min).
- JWT secrets live in environment variables; rotate them per environment.
- CORS is restricted to the configured `FRONTEND_URL`.
- Always serve over HTTPS in production.
