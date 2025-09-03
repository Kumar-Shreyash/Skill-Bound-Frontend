import { gsap } from "gsap";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/utils";
import { getCookie } from "../utils/cookies";
import { useAuth } from "./AuthContext";

export const DashboardNavbar = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate=useNavigate()
    const {setAccessToken}=useAuth()

    useEffect(()=>{
        if(!getCookie("refreshToken")){
            navigate("/login")
            setAccessToken("")
            return
        }
    })

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    function handleLogout(){
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAccessToken("")
    }

    useEffect(() => {
        if (query.length === 0) {
            setSearchResults([]);
            return;
        }

        const timerId = setTimeout(async () => {
            try {
                const res = await axios.get(`${baseURL}/course/search?query=${query}`);
                setSearchResults(res.data.courses);
            } catch (error) {
                console.error("Search failed:", error);
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [query]);

    return (
        <div className="w-full px-4 py-4 shadow-md border-b border-gray-200 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                {/* Top Row: Logo and User Info */}
                <div className="flex justify-between items-center w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <img className="h-10 w-auto" src={logo} alt="Logo" />
                    </div>

                    {/* Show logout and user info on mobile in top row */}
                    <div className="flex items-center gap-4 md:hidden">
                        {user && (
                            <div className="flex items-center gap-2">
                                <img className="w-8 h-8 rounded-full" src={user.image} alt={user.name} />
                                <p className="text-sm">
                                    {user.name} <span className="text-gray-500">({user.role})</span>
                                </p>
                            </div>
                        )}
                        <Link
                            to="/login"
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800 text-sm"
                        >
                            Logout
                        </Link>
                    </div>
                </div>

                {/* Second Row: Search Bar */}
                <div className="w-full md:w-auto relative">
                    <input
                        type="text"
                        value={query}
                        placeholder="Search courses..."
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                            {searchResults.map((course) => (
                                <Link
                                    to={`/courses/${course._id}`}
                                    key={course._id}
                                    className="flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-sm text-gray-800">{course.title}</h4>
                                        <p className="text-xs text-gray-500 truncate">₹{course.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Third Row: User Info and Logout (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                    {user && (
                        <div className="flex items-center gap-2">
                            <img className="w-10 h-10 rounded-full" src={user.image} alt={user.name} />
                            <p className="text-sm">
                                {user.name} <span className="text-gray-500">({user.role})</span>
                            </p>
                        </div>
                    )}
                    <Link
                        to="/login"
                        className="text-red-600 hover:text-red-800 text-sm"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
};
