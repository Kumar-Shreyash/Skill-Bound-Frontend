import { gsap } from "gsap";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/utils";

export const DashboardNavbar = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query.length === 0) {
            setSearchResults([]);
            return;
        }

        const timerId = setTimeout(async () => {
            try {
                let courses = await axios.get(`${baseURL}/course/search?query=${query}`);
                setSearchResults(courses.data.courses);
            } catch (error) {
                console.error("Search failed:", error);
            }
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    return (
        <div className="flex justify-between items-center px-6 py-4 shadow-md border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
                <img className="h-10 w-auto" src={logo} alt="Logo" />
            </div>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    placeholder="Search courses..."
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-2 w-72 lg:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex items-center gap-6 text-gray-700 font-medium">
                {user && (
                    <p className="text-sm sm:text-base">
                        {user.name} <span className="text-gray-500">({user.role})</span>
                    </p>
                )}
                <Link
                    to="/login"
                    className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm sm:text-base"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
};