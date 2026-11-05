# Thinkboard

Thinkboard is a note-taking app for creating, viewing, editing, and deleting notes. It uses a React frontend and an Express API backed by MongoDB.

## Features

- Create notes with a title and content
- Browse notes on the home page and open a note's details
- Edit and delete notes
- Responsive interface with theme switching
- API rate limiting

## Tech stack

- Frontend: React, Vite, Tailwind CSS, daisyUI
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Rate limiting: Upstash Redis

## Prerequisites

- Node.js and npm
- A MongoDB connection string
- Upstash Redis REST credentials

## Getting started

Install dependencies in both app directories:

```sh
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` with the following values:

```dotenv
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

The frontend defaults to the local API at `http://localhost:5001`. To use another API URL, create `frontend/.env.local`:

```dotenv
VITE_SERVER_URL=https://your-api-host
```

Start the backend and frontend in separate terminals:

```sh
cd backend
npm run dev
```

```sh
cd frontend
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

## Scripts

Run these commands from the relevant directory:

| Directory | Command | Description |
| --- | --- | --- |
| `backend` | `npm run dev` | Start the API with Node.js watch mode |
| `backend` | `npm start` | Start the API |
| `frontend` | `npm run dev` | Start the Vite development server |
| `frontend` | `npm run build` | Create a production frontend build |
| `frontend` | `npm run lint` | Run Oxlint |
| `frontend` | `npm run preview` | Preview the production frontend build |

## API

The API is mounted at `/api/notes`:

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/notes` | List notes |
| `GET` | `/api/notes/:id` | Get a note |
| `POST` | `/api/notes` | Create a note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |
