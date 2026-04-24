# MERN KYC Dashboard Application

A secure and scalable MERN stack application implementing user authentication and KYC (Know Your Customer) verification with real-time image and video capture.

---

## Project Overview

This project is a full-stack MERN application built using a clean and scalable architecture. It includes secure user authentication, KYC functionality, and a dashboard with pagination and search features.

The application demonstrates real-world development practices such as separation of concerns, secure authentication, structured API handling, and responsive UI design.

---

## Features

### Authentication
- User registration and login using JWT authentication
- Secure password hashing using bcrypt
- Token-based session management

###  Authorization
- Protected routes using middleware
- Only authenticated users can access dashboard

###  KYC Functionality
- Capture image using webcam
- Record video with audio
- Separate controls for image and video capture
- Works on desktop and mobile browsers

###  Dashboard
- Pagination for efficient data handling
- Search functionality for filtering users

###  Validation & Architecture
- Form validation using React Hook Form and Zod
- Centralized error handling
- Clean architecture (Controller → Service → Repository)

---

##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Hook Form
- Zod
- Axios
- React Toastify
- React Webcam

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Bcrypt
- Morgan (logging)

---

##  Folder Structure

### Backend
backend/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middleware/
├── constants/
├── utils/


### Frontend

frontend/
├── api/
├── services/
├── components/
├── pages/
├── schemas/
├── context/
├── hooks/
├── utils/


---

##  Setup Instructions (Run Locally)

###  Clone the Repository

git clone https://github.com/Irfana-M/Auth-KYC

cd your-repo


---

###  Backend Setup

cd backend
npm install


Create a `.env` file in the backend folder:


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run backend:

npm run dev


---

###  Frontend Setup

cd frontend
npm install


Create a `.env` file in frontend:


VITE_API_URL=http://localhost:5000/api


Run frontend:

npm run dev


---

##  Running the Application

- Frontend:  https://auth-kyc.vercel.app
- Backend: https://auth-kyc.onrender.com  

---

##  API Endpoints

| Method | Endpoint         | Description               |
|--------|----------------|--------------------------|
| POST   | /api/register  | Register a new user      |
| POST   | /api/login     | Authenticate user        |
| GET    | /api/dashboard | Protected route          |
| GET    | /api/users     | Get users with pagination|

---

## KYC Implementation

- Used **react-webcam** for capturing images  
- Used **MediaRecorder API** for recording video and audio  
- Supports modern browsers and mobile devices  
- Basic validation before submission  

---

##  Security Considerations

- Passwords are hashed using bcrypt with salt  
- JWT is used for authentication and authorization  
- Protected routes via middleware  
- Input validation using Zod  
- Environment variables used for sensitive data  

---

##  Deployment

Frontend: https://your-frontend-url.vercel.app  
Backend: https://your-backend-url.onrender.com  

---

##  Future Improvements

- Role-based access control (admin/user)
- Cloud storage for KYC files (AWS S3 / Cloudinary)
- Email verification
- Improved UI/UX
- Docker support

---

##  Author

Irfana M 
GitHub: https://github.com/Irfana-M 
LinkedIn: https://www.linkedin.com/in/irfana-riyas/  

---

## 📄 License

This project is licensed under the MIT License.