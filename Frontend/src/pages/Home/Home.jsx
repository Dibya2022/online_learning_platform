import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, Award, Star, ChevronRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Unlock Your Potential with EduHub
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover a world of knowledge with our cutting-edge online
                  learning platform. Learn from experts, connect with peers, and
                  achieve your goals.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => navigate("/courses")}>
                  Get Started
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose EduHub?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Diverse Course Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Explore a wide range of subjects taught by industry experts
                    and renowned academics.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Interactive Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Engage with instructors and peers through live sessions,
                    forums, and collaborative projects.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Recognized Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Earn certificates upon course completion to boost your
                    resume and career prospects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section
          id="courses"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Popular Courses
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Web Development Bootcamp</CardTitle>
                  <CardDescription>
                    Learn HTML, CSS, JavaScript, React, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    12 weeks • Beginner to Advanced
                  </p>
                  <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Data Science Fundamentals</CardTitle>
                  <CardDescription>
                    Master Python, SQL, Machine Learning, and Data Visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10 weeks • Intermediate
                  </p>
                  <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">(4.7)</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Digital Marketing Mastery</CardTitle>
                  <CardDescription>
                    Learn SEO, Social Media Marketing, and Content Strategy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    8 weeks • Beginner to Intermediate
                  </p>
                  <div className="mt-4 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline">
                View All Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Students Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Sarah Johnson"
                      />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Sarah Johnson</CardTitle>
                      <CardDescription>
                        Web Development Graduate
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    "EduHub's Web Development Bootcamp transformed my career.
                    The hands-on projects and supportive community were
                    invaluable."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Michael Chen"
                      />
                      <AvatarFallback>MC</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Michael Chen</CardTitle>
                      <CardDescription>Data Science Student</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    "The Data Science course is comprehensive and challenging.
                    I've gained skills that are directly applicable to my work."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt="Emily Rodriguez"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Emily Rodriguez</CardTitle>
                      <CardDescription>
                        Digital Marketing Professional
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    "The Digital Marketing course helped me stay ahead in a
                    rapidly evolving field. Highly recommended for marketers at
                    any level."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
