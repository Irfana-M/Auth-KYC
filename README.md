# MERN KYC Dashboard Application

## Description

This project is a full-stack MERN application built using a clean and scalable architecture. It includes user authentication, KYC (Know Your Customer) functionality, and a dashboard with pagination and search features.

The application is designed to demonstrate real-world development practices such as separation of concerns, secure authentication, structured API handling, and responsive UI design.

---

## Features

* User registration and login using JWT authentication
* Secure password hashing with bcrypt
* Protected routes for authenticated users
* KYC functionality:

  * Capture image using webcam
  * Record video with audio
* Dashboard with:

  * Pagination
  * Search functionality
* Form validation using React Hook Form and Zod
* Centralized error handling
* Clean architecture (Controller → Service → Repository pattern)

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Hook Form
* Zod
* Axios
* React Toastify
* React Webcam

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JSON Web Token (JWT)
* Bcrypt
* Morgan (for logging)

---

## Folder Structure

### Backend

```
backend/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── constants/
 ├── utils/
```

### Frontend

```
frontend/
 ├── api/
 ├── services/
 ├── components/
 ├── pages/
 ├── schemas/
 ├── context/
 ├── hooks/
 ├── utils/
```

---

## Installation and Setup

### 1. Clone the Repository

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file in the backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd frontend
npm install
```

Create a `.env` file in the frontend folder and add:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```
npm run dev
```

---

## Running the Application

* Frontend runs on: http://localhost:5173
* Backend runs on: http://localhost:5000

---

## API Endpoints

| Method | Endpoint   | Description               |
| ------ | ---------- | ------------------------- |
| POST   | /register  | Register a new user       |
| POST   | /login     | Authenticate user         |
| GET    | /dashboard | Protected route           |
| GET    | /users     | Get users with pagination |

---

## KYC Functionality

The application includes a KYC module that allows users to verify their identity.

* Users can capture an image using their device camera
* Users can record a video with audio using the MediaRecorder API
* The feature supports modern browsers and mobile devices
* Basic validation is applied before submission

---

## Deployment

Frontend: https://your-frontend-url.vercel.app
Backend: https://your-backend-url.onrender.com

---

## Future Improvements

* Role-based access control (admin and user roles)
* Upload KYC files to a cloud storage service
* Email verification during registration
* Improved UI/UX enhancements
* Docker-based deployment

---

## Author

Your Name
GitHub: https://github.com/your-username
LinkedIn: https://linkedin.com/in/your-profile

---

## License

This project is licensed under the MIT License.
