import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Header = ({ isAuth }) => {
  return (
    <div className="flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex bg-gray-100 items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              EduHub
            </span>
          </div>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/courses"
          >
            Courses
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/about"
          >
            About
          </Link>
          {isAuth ? (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/account"
            >
              Account
            </Link>
          ) : (
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/login"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
