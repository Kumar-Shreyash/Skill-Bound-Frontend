# 🎓 Skill-Bound — Online Course Marketplace

Skill-Bound is a full-featured **online learning platform** designed to empower educators and learners. It bridges the gap between **skill acquisition and real-world application** by offering robust tools for instructors to create, update, and monitor dynamic course content — all within an intuitive, responsive interface.

---

## 🚀 Project Type

- **Full Stack Web Application**

---

## 🌐 Live Demo

- 🔗 **Frontend**: [https://skill-bound.netlify.app/](https://skill-bound.netlify.app/)  
- 🔗 **Backend**: [https://skill-bound.onrender.com](https://skill-bound.onrender.com)  

---

## 🗂️ Directory Structure

Skill-Bound/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── utils/
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx


---

## 📸 Screenshots

> _Add your screenshots here in this section for each key feature/page._

- **Landing Page**
![Landing Page](./src/assets/screenshots/home.png)
![Landing Page Course](./src/assets/screenshots/homeCour.png)


- **Dashboard**
![Dashboard](./src/assets/screenshots/dashboardCourses.png)
![Dashboard Footer](./src/assets/screenshots/dashboardFooter.png)

- **Course Builder Modal**
![Add Course Modal](./src/assets/screenshots/addCourse.png)
![Update Course Modal](./src/assets/screenshots/updateCourse.png)



---

## 🎥 Video Walkthrough

- [🔗 Project Walkthrough](#)

- [🔗 Codebase Overview](#)

---

## 🛠️ Key Features

- 🔧 Interactive Instructor Dashboard  
- 🧩 Dynamic Course Builder with Modular Structure  
- ✏️ Course Editing and Real-time Updates  
- 📊 Student Engagement & Revenue Metrics  
- 📚 Enrollments with Progress Tracking  
- 🔍 Course Search, Filter, and Reviews  
- 📹 Video Integration & Thumbnail Support  

---

## 🎨 Design Decisions & Assumptions

- Modular Course & Lesson Creation
- Responsive UI using Tailwind CSS
- Single Modal for Add/Edit Course
- Axios for all API requests
- Clean, component-driven architecture
- Local validation and backend integration
- Disable submit during editing to prevent duplication

---

## 🧑‍💻 Installation & Getting Started

# Install Dependencies
cd frontend
npm install

cd ../backend
npm install

## Start Application 

# Start backend
node server.js

# Start Frontend
cd frontend
npm run dev


## 🔐 Environment Variables

PORT=3000
JWT_SECRET_KEY=shhhhh
MONGO_URI=mongodb://127.0.0.1:27017/DeadEndDegrees
MONGO_URI_CLOUD=mongodb+srv://shreyashsinha35:ErenYeager139@deadend-degrees.hvbjq91.mongodb.net/DeadEndDegrees?retryWrites=true&w=majority&appName=DeadEnd-Degrees


## 🧪 Credentials for Testing

| Role       | Email                               | Password |
| ---------- | ----------------------------------- | -------- |
| Learner    | [alice@a.com](mailto:alice@a.com)   | 123456   |
| Instructor | [subham@a.com](mailto:subham@a.com) | 123456   |


## 📡 API Endpoints

# 🔑 Authentication

POST /auth/signup – Register a user

POST /auth/login – Login user

# 📘 Courses

POST /course – Add a new course

GET /course – Get all courses

GET /course/:id – Get course by ID or instructor

PUT /course/:id – Update a course

DELETE /course/:id – Delete a course

POST /course/enroll/:id – Enroll in course

GET /course/search – Search courses

GET /course/filter – Filter courses

# 🌟 Reviews & Ratings

POST /review/:courseId – Add a review

POST /review/rate/:courseId – Add rating

## 🧰 Tech Stack

# Frontend

React.js

Tailwind CSS

React Router

React Icons

GSAP for animations

Axios for API calls

Vite for fast bundling


# Backend

Node.js

Express.js

MongoDB with Mongoose

JWT for authentication

Bcrypt for hashing passwords

Dotenv for environment management
