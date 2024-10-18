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

const CourseCard = ({ course }) => {
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
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
