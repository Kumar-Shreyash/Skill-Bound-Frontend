
import { Navbar } from "./navbar";
import login from "../assets/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/utils";

export const Login = () => {
const [form,setForm]=useState({email:"",password:""})
const [errorMessage, setErrorMessage]=useState("")
const navigate=useNavigate()

async function submitForm(e){
    e.preventDefault()
    try {
        let res= await axios.post(`${baseURL}/auth/login`,form,{
            headers:{
                "Content-Typ":"application/json"
            }
        })
        const data=res.data
        const userRole=data.user.role.toString()
        const user=data.user
        localStorage.setItem("user",JSON.stringify(user))
        if(userRole==="student"){
            navigate("/learner")
        }else if(userRole==="instructor"){
            navigate("/instructor")
        }else if(userRole==="admin"){
            navigate("/admin")
        }
    } catch (error) {
        setErrorMessage(error.response.data.message || "Login Failed")
        console.log(error.response.data.message)
    } finally{
        setForm({email:"",password:""})
    }
}

  return (
    <>
      <Navbar />

      <div className="w-[90%] max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center gap-12 px-4 py-8">
       
       
        <img
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
          src={login}
          alt="Login visual"
        />

        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Log in to continue your skill journey.
          </p>

          <form className="grid gap-6" onSubmit={submitForm}>
            <input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}
              className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              required
            />

            <input value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}
              className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Log In
            </button>
          </form>

          {errorMessage && (
            <div className="text-red-600 text-sm text-center mt-4">{errorMessage}</div>
            )}

          <div className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?
            <Link to={"/signup"} className="text-blue-600 hover:underline">Sign up here</Link>
          </div>
        </div>
      </div>
    </>
  );
};
