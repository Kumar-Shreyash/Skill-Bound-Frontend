import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./navbar";
import { gsap } from "gsap";
import { baseURL } from "../utils/utils";
import axios from "axios";
import ScrollTrigger from "gsap/ScrollTrigger";
import alex from "../assets/alex.webp"
import chen from "../assets/chen.webp"
import david from "../assets/david.webp"
import maria from "../assets/maria.webp"
import sarah from "../assets/sarah.webp"
import { Footer } from "./footer";


export const LandingPage = () => {
  const efRef = useRef(null);
  const [courses, setCourses] = useState([]);

  async function fetchCourses() {
    try {
      const res = await axios.get(`${baseURL}/course`);
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(".intro", { opacity: 0, y: -40 });

    tl.to(".intro", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      stagger: 0.3,
    });

    return () => tl.kill();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollContent = document.querySelector(".scroll");

    if (!scrollContent) return;

    const scrollWidth = scrollContent.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = scrollWidth - viewportWidth + 30;

    const animation = gsap.to(scrollContent, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: "#page2",
        start: "top 0%",
        end: `+=${scrollDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [courses]);

  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      image: alex,
      review: "Skill-Bound completely changed my career path! The course quality is outstanding, and the instructors are incredibly knowledgeable. Highly recommended!",
    },
    {
      id: 2,
      name: "Maria Sanchez",
      image: maria,
      review: "I've tried many platforms, but this one is the best. The courses are practical, well-structured, and easy to follow. I learned so much in a short time.",
    },
    {
      id: 3,
      name: "Chen Wei",
      image: chen,
      review: "The horizontal scroll feature is amazing! It’s a great way to browse courses. I found a great course on Python that I’m really enjoying. Top-notch platform!",
    },
    {
      id: 4,
      name: "Sarah Kim",
      image: sarah,
      review: "Affordable and packed with value. I love the community feel and the support from the instructors. This is my go-to for learning new skills.",
    },
    {
      id: 5,
      name: "David Lee",
      image: david,
      review: "Found exactly what I was looking for to level up my skills. The interface is smooth, and the content is excellent. A must-use for any lifelong learner.",
    },
  ];

  return (
    <div className="bg-gray-950">
      <Navbar />

      <div id="home"
        ref={efRef}
        className=" flex flex-col items-center justify-center min-h-[92vh] px-6 py-12 space-y-10 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-sans"
      >
        <p className="intro text-6xl sm:text-7xl md:text-8xl font-bold font-serif text-center drop-shadow-lg">
          Skill-Bound
        </p>

        <p className="intro text-2xl sm:text-3xl md:text-4xl font-serif text-center max-w-4xl text-gray-300 drop-shadow">
          Fueling Your Inner Nerd, One Skill at a Time
        </p>

        <p id="intro" className="intro text-base sm:text-lg md:text-xl font-serif max-w-5xl text-center border border-gray-700/50 rounded-2xl p-6 bg-gray-800/40 backdrop-blur-sm shadow-xl text-gray-200">
          At Skill-Bound, we connect eager learners with expert instructors from
          around the globe to help you master new skills anytime, anywhere. Our
          platform offers a vast library of high-quality courses spanning tech,
          creative arts, business, and more — designed to fit your pace and
          style. Whether you're looking to boost your career, pick up a hobby,
          or fuel your inner nerd, we make learning accessible, affordable, and
          fun. Dive in and start building your future today!
        </p>
      </div>

      <div id="page2" className="relative w-full overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
        <h2 className="text-center text-4xl font-bold text-white mb-10">Recently Added Courses</h2>
        <div className="scroll flex gap-8 w-max px-6">
          {courses.map((ele, i) => (
            <div
              key={i}
              className="p-10 w-full sm:min-w-[350px] lg:min-w-[450px] bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden text-gray-200 hover:shadow-2xl hover:cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                className="w-full h-56 object-cover rounded-t-lg"
                src={ele.image}
                alt={`Course: ${ele.title}`}
              />
              <div className="p-6 space-y-2">
                <p className="font-semibold text-xl text-white truncate">{ele.title}</p>
                <p className="text-sm text-gray-400">Duration: <span className="text-white">{ele.duration}</span></p>
                <p className="text-sm text-gray-400">Rating: <span className="text-yellow-400">{ele.averageRating || "Just Added"}</span></p>
                <p className="font-bold text-lg text-green-400">Price: ₹{ele.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 text-gray-200 py-20">
        <h2 className="text-center text-4xl font-bold text-white mb-12">What Our Learners Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 flex flex-col items-center text-center">
              <img
                className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-green-500"
                src={review.image}
                alt={review.name}
              />
              <h3 className="text-white text-lg font-semibold mb-2">{review.name}</h3>
              <p className="text-gray-400 text-sm italic">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};