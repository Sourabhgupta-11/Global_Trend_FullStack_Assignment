# Task Manager

A simple full stack Task Manager built using Node.js, Express, and React.

It allows users to create, update, delete and manage tasks easily.

---

## Features

- Add new tasks  
- Edit title and description  
- Mark tasks as complete/incomplete  
- Delete tasks  
- Filter (All / Active / Completed)  
- Data persists using JSON file  
- Basic error & loading handling  
- Backend tested using Jest  

---

## Tech Stack

- Frontend: React (Vite)  
- Backend: Node.js + Express  
- Storage: JSON file  
- Testing: Jest + Supertest  
- Deployment: Docker + Nginx  

---

## How to Run

### Option 1: Using Docker (recommended)
- git clone https://github.com/Sourabhgupta-11/Global_Trend_FullStack_Assignment
- cd task-manager
- docker-compose up --build


Then open:

- Frontend → http://localhost:5174  
- Backend → http://localhost:5000  

---

### Option 2: Run Locally

#### Backend


- cd backend
- npm install
- npm run dev


Runs at: http://localhost:5000  

#### Frontend


- cd frontend
- npm install
- npm run dev


Runs at: http://localhost:5174  

---

## API Endpoints

- GET /tasks → get all tasks  
- POST /tasks → create task  
- PATCH /tasks/:id → update task  
- DELETE /tasks/:id → delete task  

---

## Assumptions & Trade-offs

- **No database**: JSON file storage was chosen for simplicity and to avoid environment setup friction. This works well for a single-instance server; a real app would use SQLite/PostgreSQL.
- **No auth**: Out of scope for this assignment.
- **In-memory state on frontend**: React state is the source of truth on the client; no external state library (Redux etc.) was needed at this scale.
- **Vite proxy**: In dev mode, Vite proxies `/tasks` requests to the backend so no CORS config is needed in development. In Docker, nginx handles this proxy.

---

## Author

Sourabh Gupta
