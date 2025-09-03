import { Navbar } from "./navbar";
import signup from "../assets/signup.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { baseURL } from "../utils/utils";
import axios from "axios";

export const Signup = () => {
    const [form,setForm]=useState({name:"",email:"",password:"",role:""})
    const [errorMessage, setErrorMessage]=useState("")
    const navigate=useNavigate()

    async function submitForm(e){
        setErrorMessage("")
        e.preventDefault()
        // console.log(form)
        try {
          // No signup with spaces only as passwords
          if(form.password.trim()===""){
            setErrorMessage("Please enter a valid password")
            return
          }
          
            const signup=await axios.post(`${baseURL}/auth/signup`,form,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            alert("Account created successfully, redirecting to Login page.")
            navigate("/login")
            // console.log(data)
        } catch (error) {
          setErrorMessage(error.response.data.message || "Signup Failed")
          console.log(error.response.data.message)
        } finally{
            setForm({name:"",email:"",password:"",role:""})
        }
    }

  return (
    <>
      <Navbar />
      <div className="w-[90%] max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center gap-10 p-6">
        <img
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
          src={signup}
          alt="Signup visual"
        />

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Let’s Get You Onboarded!
          </h2>
          <form className="grid gap-6"  onSubmit={submitForm}>
            <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter Your Full Name"
            />
            <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter Your Email"
            />
            <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Create Password"
            />
            <select value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})} required
              className="border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled >Signing up as </option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              Sign Up
            </button>
          </form>
          {errorMessage && (
            <div className="text-red-600 text-sm text-center mt-4">{errorMessage}</div>
            )}

          <div className="text-sm text-center text-gray-500 mt-6">
            Already have an account?
            <Link to={"/login"} className="text-blue-600 hover:underline">Log in here</Link>
          </div>
        </div>
      </div>
    </>
  );
};
