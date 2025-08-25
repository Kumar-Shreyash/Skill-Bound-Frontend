import React from 'react';
import { FaInstagram, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Skill-Bound</h3>
          <p className="text-sm">
            Fueling your inner nerd, one skill at a time. We connect learners with expert instructors to help you master new skills.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-green-500 transition-colors">Home</a></li>
            <li><a href="#page2" className="hover:text-green-500 transition-colors">Courses</a></li>
            <li><a href="#home" className="hover:text-green-500 transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-green-500 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div id='contact' className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:shreyash.sinha35@gmail.com" className="hover:text-green-500 transition-colors">contact@skillbound.com</a></li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Learning Lane, Skill City, SK 12345</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/shreyash139-eren" target='_blank' rel="noopener noreferrer" aria-label="GitHub" className="hover:text-green-500 transition-colors">
            <FaGithub size={24} />
            </a>        
            <a href="https://x.com/Shreyash_si139" target='blank' aria-label="Twitter" className="hover:text-green-500 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/kumar_shreyash_/" target='blank' aria-label="Instagram" className="hover:text-green-500 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/kumar-shreyash-84079b205" target='blank' aria-label="LinkedIn" className="hover:text-green-500 transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Skill-Bound. All Rights Reserved.</p>
        <p>Designed and Developed by Kumar Shreyash.</p>
      </div>
    </footer>
  );
};