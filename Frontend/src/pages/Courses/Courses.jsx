import CourseCard from "@/components/CourseCard/CourseCard";
import { courseData } from "@/context/CourseContext";
import React from "react";

const Courses = () => {
  const { courses } = courseData(); // Destructuring the courses data
  console.log(courses); // Check if the courses data is being fetched correctly

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          // Correcting the map function to return each CourseCard
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Yet</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
