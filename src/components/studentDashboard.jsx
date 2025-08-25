import { FaStar, FaClock } from 'react-icons/fa';

const CourseCard = ({ course, onEnroll }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col h-full">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <FaClock className="mr-2 text-blue-500" />
        <span>Duration: {course.duration}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <FaStar className="mr-2 text-yellow-500" />
        <span>Rating: {course.averageRating || "N/A"}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {course.keywords.map((keyword, i) => (
          <span key={i} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{keyword}</span>
        ))}
      </div>

      <div className="mt-auto flex justify-between items-center">
        <p className="text-lg font-bold text-green-600">
          ₹{course.price}
        </p>
        <button
          onClick={() => onEnroll(course)} 
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

import axios from "axios";
import { DashboardFooter } from "./dashboardFooter";
import { DashboardNavbar } from "./dashboardNavbar";
import { baseURL } from "../utils/utils";
import { useEffect, useState } from "react";

export const StudentDashboard = () => {
  const [marketing, setMarketing] = useState([]);
  const [dev, setDev] = useState([]);
  const [coursesEnrolled, setCoursesEnrolled] = useState(0);

  async function fetchCourses() {
    try {
      const marketingRes = await axios.get(`${baseURL}/course/68ab0eb1d8b1b39f98cbbff7`);
      setMarketing(marketingRes.data.course1);
      
      const devRes = await axios.get(`${baseURL}/course/68ab0ef0d8b1b39f98cbbffd`);
      setDev(devRes.data.course1);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      alert(error.response?.data?.message || "Failed to fetch courses.");
    }
  }

  async function handleEnroll(course) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("Please log in to enroll in a course.");
        return;
      }

      await axios.post(`${baseURL}/course/enroll/${course._id}`, { userId: user._id }); 
      alert(`Enrolled in ${course.title}`);
      
      
      setCoursesEnrolled(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert(error.response?.data?.message || "Failed to enroll in the course.");
    }
  }

  useEffect(() => {
    fetchCourses();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.courses) {
      setCoursesEnrolled(user.courses.length);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 text-center">
          <h3 className="text-2xl font-bold text-gray-700">Courses Enrolled</h3>
          <p className="text-4xl font-extrabold text-blue-600">{coursesEnrolled}</p>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Explore Our Courses</h1>
        
        {/* Digital Marketing Courses Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">Digital Marketing Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {marketing.length > 0 ? (
              marketing.map((course, i) => (
                <CourseCard key={i} course={course} onEnroll={handleEnroll} />
              ))
            ) : (
              <p className="text-gray-500">No digital marketing courses available at the moment.</p>
            )}
          </div>
        </section>

        {/* Software Development Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-700 mb-6 border-b-2 border-gray-300 pb-2">Software Development</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dev.length > 0 ? (
              dev.map((course, i) => (
                <CourseCard key={i} course={course} onEnroll={handleEnroll} />
              ))
            ) : (
              <p className="text-gray-500">No software development courses available at the moment.</p>
            )}
          </div>
        </section>
      </div>
      <DashboardFooter />
    </div>
  );
};