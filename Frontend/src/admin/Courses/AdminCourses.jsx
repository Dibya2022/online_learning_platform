import React from "react";
import Layout from "../utils/Layout";
import { useNavigate } from "react-router-dom";
import { courseData } from "@/context/CourseContext";
import { Card, CardTitle } from "@/components/ui/card";
import CourseCard from "@/components/CourseCard/CourseCard";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }
  const { courses } = courseData();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">All Courses</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div>No Courses Found</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
