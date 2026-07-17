# Installation Guide

## Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or later recommended)
- npm
- MySQL Server
- MySQL Workbench (optional)
- Git

---

## Clone the Repository

```bash
git clone https://github.com/your-username/project-management-app.git
cd project-management-app
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your database credentials.

Start the backend server:

```bash
npm start
```

The backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will run on:

```
http://localhost:3000
```

---

## Import the Database

1. Open MySQL Workbench.
2. Create a database:

```sql
CREATE DATABASE project_management;
```

3. Import the provided SQL file into the database.
4. Verify that the required tables (`users`, `projects`, and `tasks`) are created successfully.

---

## Verify the Application

1. Start the backend server.
2. Start the frontend application.
3. Open `http://localhost:3000`.
4. Register a new user account.
5. Log in using the registered credentials.
6. Create a project.
7. Add tasks to the project.
8. Edit, update, and delete projects/tasks to verify all CRUD operations.