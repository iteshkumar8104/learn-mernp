# Deployment Instructions for EduLearn MERN Application

This document provides step-by-step instructions to deploy the EduLearn MERN application from zero, including environment setup, backend and frontend deployment, and running the app in production.

---

## Prerequisites

- Node.js and npm installed on your machine. Download from https://nodejs.org/
- MongoDB installed and running locally or use a cloud MongoDB service like MongoDB Atlas.
- Git installed (optional, for cloning the repo).
- Basic command line knowledge.

---

## Backend Deployment

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `backend` directory with the following content:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Replace `your_mongodb_connection_string` with your MongoDB connection string. For local MongoDB, it might be `mongodb://localhost:27017/edulearn`.

   Replace `your_jwt_secret_key` with a secure random string.

4. **Start the backend server:**

   For development:

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm start
   ```

   The backend server will run on port 5000 by default.

---

## Frontend Deployment

1. **Navigate to the root project directory (if not already there):**

   ```bash
   cd ..
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Configure API endpoint:**

   If needed, update the API base URL in the frontend code (e.g., in `src/components/BackendAPI.js`) to point to your deployed backend URL.

4. **Start the frontend development server:**

   ```bash
   npm start
   ```

   The frontend will run on port 3000 (or another port if 3000 is in use).

5. **Build for production:**

   ```bash
   npm run build
   ```

   This creates an optimized production build in the `build` directory.

---

## Deployment to Hosting Services

### Backend

- Deploy the backend to a cloud service like Heroku, AWS Elastic Beanstalk, or DigitalOcean.
- Ensure environment variables are set in the hosting environment.
- Use MongoDB Atlas or another cloud MongoDB service for production.

### Frontend

- Deploy the frontend build to services like Vercel, Netlify, or GitHub Pages.
- Configure the frontend to use the backend API URL in production.

---

## Running the Application

- Access the frontend URL in your browser.
- Register as a user or admin.
- Login and access the dashboard.
- Create and view course pages.
- Upload media files (admin only).

---

## Additional Notes

- For media uploads, ensure the backend `uploads` directory is writable and accessible.
- Secure your JWT secret and database credentials.
- Monitor logs and errors in production.

---

If you need help with any specific deployment platform or further assistance, feel free to ask.
