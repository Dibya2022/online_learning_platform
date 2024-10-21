import { courseData } from "@/context/CourseContext";
import { server } from "@/main";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, User, BookOpen, BookOpenText } from "lucide-react";

const CourseStudy = ({ user }) => {
  const params = useParams();
  console.log(params);
  const { fetchCourse, course } = courseData();
  const navigate = useNavigate();
  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");
  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span>{course.createdBy}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpenText className="mr-2 h-4 w-4" />
                <span>{course.description}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{course.duration} Weeks</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/lecture/${course._id}`}>
                <Button className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Access Lectures
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
