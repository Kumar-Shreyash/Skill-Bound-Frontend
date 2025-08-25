# Project Title
Skill-Bound(Online Course Marketplace)

## Introduction
Skill Bound is an innovative online learning platform designed to empower educators and learners by bridging the gap between skill acquisition and real-world application. With an intuitive dashboard for instructors and a seamless course management system, Skill Bound enables educators to create, update, and monitor courses with ease. The platform prioritizes dynamic content delivery, student engagement tracking, and personalized learning experiences — all while providing meaningful analytics to help instructors scale their impact. Whether you're a seasoned teacher or a budding mentor, Skill Bound equips you with the tools to shape the future of learning.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://deployed-site.whatever
Backend: https://deployed-site.whatever
Database: https://deployed-site.whatever


## Directory Structure
Skill-Bound/
├── backend/
│   ├── config/
│   │   └── db.config.js                   
│   ├── controllers/
│   │   ├── auth.controller.js            
│   │   ├── course.controller.js        
│   │   └── review.controller.js        
│   ├── middlewares/
│   │   └── auth.middleware.js         
│   ├── models/
│   │   ├── course.model.js                
│   │   └── user.model.js                
│   ├── routes/
│   │   ├── auth.routes.js                 
│   │   ├── course.routes.js              
│   │   └── review.routes.js             
│   └── server.js                          

├── frontend/
│   └── src/
│       ├── assets/
│       │   └── media/                    
│       ├── components/
│       │   ├── adminDashboard.jsx         
│       │   ├── dashboardFooter.jsx        
│       │   ├── dashboardNavbar.jsx        
│       │   ├── footer.jsx                 
│       │   ├── instructorDashboard.jsx    
│       │   ├── landingPage.jsx            
│       │   ├── login.jsx                  
│       │   ├── navbar.jsx                 
│       │   ├── signup.jsx                 
│       │   ├── studentDashboard.jsx       
│       ├── utils/
│       │   └── utils.js                   
│       ├── App.css                        
│       ├── App.jsx                        
│       └── main.jsx                       


## Video Walkthrough of the project


## Video Walkthrough of the codebase

## Features
The key features of Skill-Bound

- Interactive Instructor Dashboard
- Dynamic Course Builder
- Course Editing & Updating
- Student Engagement Metrics
- Revenue Tracking


## design decisions or assumptions

- Modular Course Structure
- Dedicated Instructor Dashboard
- Clean & Responsive UI using Tailwind CSS
- Form-Based Course Creation with Dynamic Inputs
- API Integration with Axios
- Single Modal for Add & Edit
- Disable Submit Button During Edit

## Installation & Getting started

```bash
npm i
cd my-project
npm run dev(front-end)
node server.js(backend)
```

## Environment Variables
    
    PORT=3000
    JWT_SECRET_KEY='shhhhh'
    MONGO_URI="mongodb://127.0.0.1:27017/DeadEndDegrees"
    MONGO_URI_CLOUD="mongodb+srv://shreyashsinha35:ErenYeager139@deadend-degrees.hvbjq91.mongodb.net/DeadEndDegrees?retryWrites=true&w=majority&appName=DeadEnd-Degrees"

## Usage
--Login / Signup
    -Navigate to the homepage.

    -Register 

    -Choose your role:

    -Instructor (to upload courses)

    -Learner (to browse and enroll)

    -Login
 
 --For Instructors
    -Instructor Dashboard Overview

    -Once logged in as an instructor, you’ll be taken to the Instructor Dashboard, where you can:

    -View total courses uploaded

    -Monitor total enrolled students

    -Track revenue earned

    -See your top-performing course

--Click the "+ Add Course" button.

    -A modal form will appear where you can:

    -Fill in course details (title, price, duration, etc.)

    -Add a course thumbnail and intro video link

    -Add modules with lessons (title, type, duration, and description)

    -Add multiple modules and lessons dynamically

    -Click Submit Course to publish it.

--Enrolling in a Course

    -Click on a course to view more details.

    -Click Enroll Now to register.

    -Your profile will update with the course and its progress tracking.


## Credentials
Learner-alice@a.com Password-123456
Instructor-rajdeep@a.com Password-123456

## API Endpoints
POST auth/signup -Signing up
POST auth/login -logging in
POST course -adding course
GET course -get all courses
GET course/:id -get course by id or get all courses of a instructor
PUT course/:id -updating the course
DELETE course/:id -deleting the course
POST course/enroll/:id -enrolling in a course
GET course/search -searching course
GET course/filter -filtering course
POST review/:courseId -adding a review
POST review/rate/courseId -rating the course

## Technology Stack
A brief overview of the technologies used in the project.

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- Dotenv
- Bcrypt
- Jsonwebtoken
- React
- Tailwind
- GSAP
- React-dom
- React-router-dom
- React-icons
