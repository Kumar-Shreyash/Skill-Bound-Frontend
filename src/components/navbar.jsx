import {gsap} from "gsap"
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
export const Navbar=()=>{

    return(
        <div className="flex justify-between border-b border-gray-300 bg-white">
        <div className="m-3 ml-10 text-xl font-bold">
            <Link to={"/"}><img className="w-auto h-10" src={logo} alt="" /></Link> 
        </div>
        <div className="m-3 mr-10 flex justify-between items-center w-30">
            <Link to={"/signup"} className="hover:text-blue-500">Signup</Link>
            <Link to={"/login"} className="hover:text-blue-500">Login</Link>
        </div>
        </div>
    )
}