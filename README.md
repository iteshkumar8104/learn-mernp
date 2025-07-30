<<<<<<< HEAD
# EduLearn MERN Application

This is a basic MERN (MongoDB, Express, React, Node.js) educational application with user and admin roles. It supports content pages with media upload.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Community Server)

## Setup Instructions

### 1. Install Node.js

Download and install Node.js from https://nodejs.org/

### 2. Install MongoDB

Download and install MongoDB Community Server from https://www.mongodb.com/try/download/community

After installation, start MongoDB server:

- On Windows, open Command Prompt or PowerShell as Administrator and run:
  ```
  net start MongoDB
  ```
  Or run `mongod` if installed as a standalone.

### 3. Backend Setup

Open a terminal and navigate to the `backend` directory:

```
cd backend
npm install
npm run dev
```

This will start the backend server on port 5000.

### 4. Frontend Setup

Open another terminal and navigate to the root project directory:

```
npm install
npm start
```

This will start the React frontend on port 3000.

### 5. Usage

- Register as a user or admin.
- Admin users can create, edit pages, and upload media.
- Users can view pages and media content.

## Deployment

For deployment, you can use platforms like Heroku (backend) and Vercel (frontend).

- Deploy backend to Heroku:
  - Create a Heroku app.
  - Set environment variables (e.g., MONGO_URI, JWT_SECRET).
  - Push backend code to Heroku.
- Deploy frontend to Vercel:
  - Connect your GitHub repo.
  - Configure build settings.
  - Deploy.

## Notes

- Ensure MongoDB is running before starting the backend.
- Media files are stored in the `uploads` folder on the backend.

## License

MIT License
=======
# edulearn-mern
--
>>>>>>> f6264f6433d5906b7e90fb2b2d6e91387927b768
