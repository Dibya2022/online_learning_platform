import { Button } from "@/components/ui/button";
import { courseData } from "@/context/CourseContext";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, GraduationCap, Users } from "lucide-react";
import { server } from "@/main";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course } = courseData();
  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">
                    {course.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration} Weeks
                    </Badge>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary">
                  ${course.price}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Course Overview</h2>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Instructor</h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage alt={course.createdBy} />
                    <AvatarFallback>DN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{course.createdBy}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {course.instructor.title} */}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {user && user.subscription.includes(course._id) ? (
                <Button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full"
                  size="lg"
                >
                  Study
                </Button>
              ) : (
                <Button className="w-full" size="lg">
                  Buy Now for ${course.price}
                  <GraduationCap className="ml-2 h-5 w-5" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default CourseDescription;
