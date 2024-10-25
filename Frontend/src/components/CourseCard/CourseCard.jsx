import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, IndianRupee, User, Calendar } from "lucide-react";
import { server } from "@/main";
import { UserData } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { courseData } from "@/context/CourseContext";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();
  const { fetchCourses } = courseData();

  const deletHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={`${server}/${course.image}`}
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {course.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="mb-2 text-2xl font-bold text-primary">
          {course.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-4">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration} weeks
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {course.createdBy}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(course.createdAt).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-6">
        <div className="flex items-center text-2xl font-bold text-primary">
          <IndianRupee className="w-6 h-6 mr-1" />
          {course.price}
        </div>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <Button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Study
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Get Started
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Study
              </Button>
            )}
          </>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Enroll Now
          </Button>
        )}
        {user && user.role === "admin" && (
          <Button
            onClick={() => deletHandler(course._id)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
