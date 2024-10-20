import React from "react";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   Progress,
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
//   Badge,
// } from "@/components/ui/";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  BookOpen,
  Calendar,
  Users,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import { courseData } from "@/context/CourseContext";
import { UserData } from "@/context/UserContext";
import CourseCard from "@/components/CourseCard/CourseCard";

const Dashboard = ({ user }) => {
  const { myCourse, course } = courseData();
  const { setUser } = UserData();
  return (
    <div>
      (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* User Profile Summary */}
            {user && (
              <Card className="col-span-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Welcome back, {user.name}</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Enrolled Courses */}
            <Card className="col-span-full md:col-span-2">
              <CardHeader>
                <CardTitle>Enrolled Courses</CardTitle>
              </CardHeader>
              {myCourse && myCourse.length > 0 ? (
                myCourse.map((e) => <CourseCard key={e._id} course={e} />)
              ) : (
                <p>No Course Enrolled Yet!</p>
              )}
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Project Submission", "Quiz", "Peer Review"].map(
                  (task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{task}</span>
                      <Badge variant="outline" className="ml-auto">
                        {["2d", "5d", "1w"][index]}
                      </Badge>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Completed Lesson 5 in Web Dev",
                  "Submitted assignment for Data Science",
                  "Joined UX Design study group",
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Access */}
            {/* <Card className="col-span-full md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <Users className="h-6 w-6 mb-2" />
                  Community
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <MessageCircle className="h-6 w-6 mb-2" />
                  Messages
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Resources
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Progress
                </Button>
              </CardContent>
            </Card> */}

            {/* Overall Progress */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-around">
                {[
                  "Courses Completed",
                  "Assignments Submitted",
                  "Quiz Score Avg.",
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <h3 className="text-3xl font-bold">
                      {[5, 28, "85%"][index]}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stat}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      )
    </div>
  );
};

export default Dashboard;
