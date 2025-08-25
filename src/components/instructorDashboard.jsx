
import { DashboardNavbar } from "./dashboardNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/utils";
import { DashboardFooter } from "./dashboardFooter";
import { FaUserGraduate, FaChartLine, FaDollarSign, FaStar, FaEdit, FaTrashAlt } from 'react-icons/fa';

export const InstructorDashboard = () => {
  const [totalCourses, setTotalCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [best, setBest] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [courseData, setCourseData] = useState({
    title: "",
    duration: "",
    price: "",
    image: "",
    introVid: "",
    keywords: "",
    description: "",
    content: [{
      title: "",
      lessons: [{
        title: "",
        duration: "",
        type: "",
        description: ""
      }]
    }]
  });

  async function handleEdit(ele) {
    try {
      const fixedContent = Array.isArray(ele.content)
        ? ele.content
        : typeof ele.content === "string"
          ? JSON.parse(ele.content)
          : [];
  
      const fixedCourseData = {
        ...ele,
        keywords: Array.isArray(ele.keywords) ? ele.keywords.join(", ") : ele.keywords,
        content: fixedContent.map((module) => ({
          title: module.title || "",
          lessons: Array.isArray(module.lessons)
            ? module.lessons.map((lesson) => ({
                title: lesson.title || "",
                duration: lesson.duration || "",
                type: lesson.type || "",
                description: lesson.description || "",
              }))
            : [],
        })),
      };
  
      setCourseData(fixedCourseData);
      setShowForm(true);
      setIsEditing(true);
      localStorage.setItem("courseId", JSON.stringify(ele._id));
    } catch (error) {
      alert(error?.message || "Error parsing course data.");
      console.error(error);
    }
  }
  
  async function handleUpdateCourse() {
    try {
      let id = JSON.parse(localStorage.getItem("courseId"));
      const res = await axios.put(`${baseURL}/course/${id}`, courseData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert(`Course updated successfully`);
      localStorage.removeItem('courseId');
      setShowForm(false);
      courses();
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during update.");
    } finally {
      setIsEditing(false);
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));

  async function courses() {
    try {
      let res = await axios.get(`${baseURL}/course/${user._id}`);
      let courses = res.data.course1;
      setTotalCourses(courses);
      let students = courses.reduce((acc, course) => acc + (course.students?.length || 0), 0);
      let max = 0;
      let bestTitle = "None";
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].students.length > max) {
          max = courses[i].students.length;
          bestTitle = courses[i].title;
        }
      }
      setBest(bestTitle);
      setTotalStudents(students);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    courses();
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...courseData.content];
    updatedModules[index][field] = value;
    setCourseData({ ...courseData, content: updatedModules });
  };

  const handleLessonChange = (modIdx, lessonIdx, field, value) => {
    const updatedModules = [...courseData.content];
    updatedModules[modIdx].lessons[lessonIdx][field] = value;
    setCourseData({ ...courseData, content: updatedModules });
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      content: [...courseData.content, {
        title: "",
        lessons: [{
          title: "",
          duration: "",
          type: "",
          description: ""
        }]
      }]
    });
  };

  const addLesson = (modIdx) => {
    const updatedModules = [...courseData.content];
    updatedModules[modIdx].lessons.push({
      title: "",
      duration: "",
      type: "",
      description: ""
    });
    setCourseData({ ...courseData, content: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...courseData,
        keywords: courseData.keywords.split(',').map(k => k.trim())
      };
      await axios.post(`${baseURL}/course`, payload);
      alert(`${courseData.title} added successfully`);
      setCourseData({
        title: "",
        duration: "",
        price: "",
        image: "",
        introVid: "",
        keywords: "",
        description: "",
        content: [{
          title: "",
          lessons: [{
            title: "",
            duration: "",
            type: "",
            description: ""
          }]
        }]
      });
      setShowForm(false);
      courses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "An error occurred while adding the course.");
    }
  };

  async function handleDelete(id, title) {
    try {
      await axios.delete(`${baseURL}/course/${id}`);
      alert(`${title} deleted successfully`);
      courses();
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during deletion.");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        
        {/* Header and Add Course Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Instructor Dashboard</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          >
            + Add Course
          </button>
        </div>

        {/* Modal Popup */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[90%] max-h-[90vh] overflow-y-auto md:w-[70%] rounded-xl shadow-2xl p-6 relative">
              <button
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
                className="absolute top-4 right-4 text-gray-500 text-3xl font-bold hover:text-gray-800 transition"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                {isEditing ? "Update Course" : "Add New Course"}
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={isEditing ? null : handleSubmit}>
                <input name="title" value={courseData.title} onChange={handleChange} type="text" placeholder="Course Title" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input name="duration" value={courseData.duration} onChange={handleChange} type="text" placeholder="Duration (e.g., 7 weeks)" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input name="price" value={courseData.price} onChange={handleChange} type="number" placeholder="Price" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input name="image" value={courseData.image} onChange={handleChange} type="text" placeholder="Image URL" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input name="introVid" value={courseData.introVid} onChange={handleChange} type="text" placeholder="Intro Video URL" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input name="keywords" value={courseData.keywords} onChange={handleChange} type="text" placeholder="Keywords (comma separated)" className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                <textarea name="description" value={courseData.description} onChange={handleChange} placeholder="Course Description" className="border rounded-lg px-4 py-2 col-span-1 md:col-span-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>

                {/* Dynamic Modules */}
                {courseData.content.map((module, modIdx) => (
                  <div key={modIdx} className="col-span-1 md:col-span-2 border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Module {modIdx + 1}</h3>
                    <input
                      type="text"
                      placeholder="Module Title"
                      className="border rounded-lg px-4 py-2 w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={module.title}
                      onChange={(e) => handleModuleChange(modIdx, 'title', e.target.value)}
                    />
                    {module.lessons.map((lesson, lessonIdx) => (
                      <div key={lessonIdx} className="mb-4 bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-md font-medium mb-1 text-gray-600">Lesson {lessonIdx + 1}</h4>
                        <input type="text" placeholder="Lesson Title" className="border rounded-lg px-4 py-2 w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none" value={lesson.title} onChange={(e) => handleLessonChange(modIdx, lessonIdx, 'title', e.target.value)} />
                        <input type="text" placeholder="Duration" className="border rounded-lg px-4 py-2 w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none" value={lesson.duration} onChange={(e) => handleLessonChange(modIdx, lessonIdx, 'duration', e.target.value)} />
                        <input type="text" placeholder="Type (video/article)" className="border rounded-lg px-4 py-2 w-full mb-2 focus:ring-2 focus:ring-blue-500 outline-none" value={lesson.type} onChange={(e) => handleLessonChange(modIdx, lessonIdx, 'type', e.target.value)} />
                        <textarea placeholder="Lesson Description" className="border rounded-lg px-4 py-2 w-full resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={lesson.description} onChange={(e) => handleLessonChange(modIdx, lessonIdx, 'description', e.target.value)} />
                      </div>
                    ))}
                    <button type="button" onClick={() => addLesson(modIdx)} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      + Add Lesson
                    </button>
                  </div>
                ))}
                
                <button type="button" onClick={addModule} className="col-span-1 md:col-span-2 text-blue-600 font-medium mt-4 hover:underline flex items-center gap-1">
                  + Add Module
                </button>

                <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
                  <button
                    id="submit"
                    type="submit"
                    disabled={isEditing}
                    className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${isEditing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Submit Course
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateCourse}
                    disabled={!isEditing}
                    className={`flex-1 py-3 rounded-lg font-semibold transition duration-200 ${!isEditing ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-600 text-white hover:bg-yellow-700'}`}
                  >
                    Update Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border rounded-xl shadow-lg p-6 flex items-center gap-4">
            <FaUserGraduate size={32} className="text-blue-600" />
            <div>
              <p className="text-gray-500 text-sm">Courses Uploaded</p>
              <span className="text-3xl font-bold text-blue-800">{totalCourses.length}</span>
            </div>
          </div>
          <div className="bg-white border rounded-xl shadow-lg p-6 flex items-center gap-4">
            <FaChartLine size={32} className="text-green-600" />
            <div>
              <p className="text-gray-500 text-sm">Enrolled Students</p>
              <span className="text-3xl font-bold text-green-800">{totalStudents}</span>
            </div>
          </div>
          <div className="bg-white border rounded-xl shadow-lg p-6 flex items-center gap-4">
            <FaDollarSign size={32} className="text-purple-600" />
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <span className="text-3xl font-bold text-purple-800">₹{user.totalRevenue}</span>
            </div>
          </div>
          <div className="bg-white border rounded-xl shadow-lg p-6 flex items-center gap-4">
            <FaStar size={32} className="text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Top Course</p>
              <span className="text-xl font-semibold text-gray-800">{best || "None"}</span>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {totalCourses.map((ele, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 relative border border-gray-200 hover:shadow-xl transition-shadow duration-200">
                <img src={ele.image} alt={ele.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{ele.title}</h3>
                <p className="text-sm text-gray-600">
                  Students: <span className="font-medium">{ele.students.length}</span>
                </p>
                <p className="text-sm text-gray-600">Revenue: ₹{ele.price * ele.students.length}</p>
                <p className="text-sm text-gray-600">Avg. Rating: <span className="text-yellow-500">{ele.averageRating || "N/A"}</span></p>
                <p className="text-sm text-gray-600 mb-4">Total Reviews: {ele.reviews.length}</p>
      
                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(ele)}
                    className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ele._id, ele.title)}
                    className="flex items-center gap-1 text-red-600 hover:underline text-sm font-medium transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <DashboardFooter />
    </div>
  );
};