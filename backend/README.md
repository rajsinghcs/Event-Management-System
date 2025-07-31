# Event Management Backend API

This is a Node.js + Express backend for the Event Management System, using MongoDB.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your MongoDB connection string in `.env` (default is `mongodb://localhost:27017/event-ms`).
3. Start the server:
   ```sh
   npm run dev
   ```
   The server will run on http://localhost:4000 by default.

## API Endpoints

- `GET /api/events` — List all events
- `GET /api/events/:id` — Get event by ID
- `POST /api/events` — Create a new event
- `PUT /api/events/:id` — Update an event
- `DELETE /api/events/:id` — Delete an event
- `POST /api/events/:id/register` — Register for an event (body: `{ name, email }`)

## Project Structure

- `index.js` — Main server file
- `models/Event.js` — Mongoose model for events and registrations
- `routes/eventRoutes.js` — Express routes for event CRUD and registration
- `.env` — Environment variables

---

Feel free to extend this backend with authentication, validation, or more features as needed. 