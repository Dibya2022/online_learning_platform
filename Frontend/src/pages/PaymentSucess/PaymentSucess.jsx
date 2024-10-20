import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, BookOpen, GraduationCap } from "lucide-react";
import { courseData } from "@/context/CourseContext";
import { server } from "@/main";
const PaymentSucess = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = courseData();
  // useEffect(() => {
  //   if (params.id) {
  //     fetchCourse(params.id); // Fetch course data by passing course ID
  //   }
  // }, [params.id, fetchCourse]); // Dependency array to trigger on ID change

  return (
    <div>
      {user && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-3xl font-bold text-green-700">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center text-gray-600">
                <p>
                  Thank you for your purchase. Your course is now ready to
                  access.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Order Details</h3>
                <div className="flex justify-between items-center">
                  <span>Course:</span>
                  <span className="font-medium">{`${course.title}`}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Price:</span>
                  <span className="font-medium">₹{course.price}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>Order Id:</span>
                  <span className="font-medium">{params.id}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Next Steps:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    Access your course materials in the learning dashboard
                  </li>
                  <li>Set up your study schedule</li>
                  <li>Join the course community forum</li>
                  <li>Download any required software or tools</li>
                </ul>
              </div>
            </CardContent>

            <Link to={`/${user._id}/dashboard`}>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="w-full ml-40 justify-center sm:w-1/2"
                  size="lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Start Learning
                </Button>
              </CardFooter>
            </Link>
            {/* <Button variant="outline" className="w-full sm:w-1/2" size="lg">
                <GraduationCap className="mr-2 h-5 w-5" /> View All Courses
              </Button> */}
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentSucess;
