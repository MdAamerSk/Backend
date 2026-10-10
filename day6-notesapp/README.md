# Notes App API

A RESTful backend API for managing notes built with Node.js, Express, and MongoDB (Mongoose).

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**

---

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd day6-notesapp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/notes-app
```

### 4. Run the server
```bash
npm start
```
The server will run on `http://localhost:4000`.

---

## API Endpoints

Base URL: `http://localhost:4000/notes`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/notes/create` | Create a new note | `{ "title": "string", "description": "min 20 chars" }` |
| **GET** | `/notes/allNotes` | Fetch all notes | None |
| **GET** | `/notes/:id` | Fetch a single note by ID | None |
| **PUT** | `/notes/:id` | Update a note by ID | `{ "title"?: "string", "description"?: "string" }` |
| **DELETE** | `/notes/:id` | Delete a note by ID | None |
