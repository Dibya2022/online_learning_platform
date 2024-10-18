import { server } from "@/main";
import axios from "axios";

import { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courses, setCourse] = useState([]);
  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <CourseContext.Provider value={{ courses, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const courseData = () => useContext(CourseContext);
