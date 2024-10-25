import { Button } from "@/components/ui/button";
import { courseData } from "@/context/CourseContext";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "@/context/UserContext";
import Loading from "@/components/Loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = courseData();
  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    const options = {
      key: "rzp_test_PoBAFUjq0aXBh5", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EduHub", //your business name
      description: "Learn with us",
      // "image": "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );
          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-sucess/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                      ₹{course.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Course Overview
                    </h2>
                    <p className="text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Your Instructor
                    </h2>
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
                    <Button
                      onClick={checkoutHandler}
                      className="w-full"
                      size="lg"
                    >
                      Buy Now for ${course.price}
                      <GraduationCap className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
