# Setup Instructions

## Prerequisites

Before running the project, make sure the following software is installed on your system:

- Node.js (v18 or later)
- npm
- MySQL Server
- Git
- Expo Go (for the React Native frontend)

---

## Clone the Repository

```bash
git clone <repository-url>
cd project-management-app
```

Replace `<repository-url>` with your GitHub repository URL.

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install the required packages:

```bash
npm install
```

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=project_management

JWT_SECRET=your_secret_key
```

---

## Database Setup

Open MySQL and create the database:

```sql
CREATE DATABASE project_management;
```

Import the provided SQL schema into the database.

---

## Start the Backend

```bash
npm start
```

The backend server will start at:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

For a React Native Expo application:

```bash
npx expo start
```

Scan the QR code using the Expo Go app on your Android device or run it on an Android emulator.

---

## Running the Application

1. Start MySQL.
2. Start the backend server.
3. Start the frontend application.
4. Register a new account.
5. Login.
6. Upload media with an unlock price.
7. Browse uploaded media.
8. Unlock paid media using wallet coins.
9. View previously unlocked media.

---

## Default Configuration

| Item | Value |
|------|-------|
| Backend Port | 5000 |
| Database | MySQL |
| Authentication | JWT |
| Frontend | React Native (Expo) |

---

## Troubleshooting

### Backend won't start

- Verify the `.env` configuration.
- Ensure MySQL is running.
- Check that all dependencies are installed.

### Database connection failed

- Confirm the MySQL username and password.
- Verify that the database exists.
- Check that the database name matches the `.env` file.

### Frontend cannot connect to backend

- Ensure the backend server is running.
- Verify the backend URL configured in the frontend.
- If using a physical Android device, use your computer's local IP address instead of `localhost`.