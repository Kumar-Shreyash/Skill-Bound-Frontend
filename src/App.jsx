import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {LandingPage} from "./components/landingPage"
import { Route, Routes } from 'react-router-dom'
import { Signup } from './components/signup'
import { Login } from './components/login'
import { StudentDashboard } from './components/studentDashboard'
import { InstructorDashboard } from './components/instructorDashboard'
import { AdminDashboard } from './components/adminDashboard'


function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/learner" element={<StudentDashboard/>}/>
      <Route path="/instructor" element={<InstructorDashboard/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
     </Routes>
    </>
  )
}

export default App
