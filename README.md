# Maximus Task Manager

## Student Information

Name: Tsholofelo Blessing Bathusi  
Course: INFS202 Web Design & Development  
Project Type: Individual Project

## Project Description

Maximus Task Manager is a full-stack task management web application. It allows users to create an account, log in securely, add tasks, view tasks, edit tasks, mark tasks as complete, delete tasks, and log out.

The project has a React frontend and a Node.js/Express backend. The backend uses a SQL-based SQLite database with two related tables: users and tasks.

## Live Links

Frontend Website: https://maximus-task-manager-app.vercel.app
Backend API: https://maximus-task-manager.onrender.com

## Features

- User registration
- User login
- Secure password hashing
- JWT authentication
- Add tasks
- View task list
- View task details
- Edit tasks
- Mark tasks as complete
- Delete tasks
- Logout

## Technologies Used

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- SQLite3
- bcryptjs
- JSON Web Token
- CORS
- dotenv

### Deployment

- Vercel for frontend
- Render for backend
- GitHub for version control

## Folder Structure

MAXIMUS TASK MANAGER

- Frontend: contains the React user interface
- Backend: contains the Express server, routes, controllers, middleware, and database connection

## Database Design

### Users Table

- id: primary key
- name: user name
- email: unique email address
- password_hash: encrypted password

### Tasks Table

- id: primary key
- title: task title
- description: task description
- priority: task priority
- completed: task status
- user_id: foreign key connected to users table

## Relationship

One user can have many tasks.  
Each task belongs to one user through the user_id foreign key.

## API Endpoints

### Authentication

POST /api/auth/register  
POST /api/auth/login

### Tasks

GET /api/tasks  
GET /api/tasks/:id  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id

## How to Run Locally

### Backend

cd Backend  
npm install  
npm run dev

Backend runs on:
http://localhost:5050

### Frontend

cd Frontend  
npm install  
npm run dev

Frontend runs on:
http://localhost:5173

## Security

Passwords are hashed using bcryptjs before being stored in the database. JWT tokens are used to protect task routes so that only logged-in users can manage tasks.

## Notes

SQLite was used as a SQL-based relational database. The project demonstrates database tables, relationships, authentication, CRUD operations, and deployment.
