import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-gray-600">
        <div className="grid gap-8 md:grid-cols-3 text-center md:text-left">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              About EduHub
            </h2>
            <p className="mt-2 text-sm">
              EduHub offers a wide range of courses to help learners enhance
              their skills and knowledge. Join us to start learning today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Quick Links</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-blue-500">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link to="/contact" className="hover:text-blue-500">
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Contact Us</h2>
            <p className="mt-2 text-sm">Nayagarh,Odisha</p>
            <p className="text-sm">Email: support@eduhub.com</p>
            <p className="text-sm">Phone: +91 8327749705</p>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 flex flex-col items-center space-y-4 border-t pt-6 md:flex-row md:justify-between">
          <div className="flex space-x-4">
            <Link
              to="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6 text-gray-600 hover:text-blue-600" />
            </Link>
            <Link
              to="https://www.twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 text-gray-600 hover:text-blue-400" />
            </Link>
            <Link
              to="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6 text-gray-600 hover:text-pink-500" />
            </Link>
            <Link
              to="https://www.linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-gray-600 hover:text-blue-700" />
            </Link>
          </div>
          <p className="text-sm">&copy; 2024 EduHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
