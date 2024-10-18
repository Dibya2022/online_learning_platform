import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: BookOpen,
      title: "Diverse Courses",
      description:
        "Explore a wide range of subjects taught by expert instructors.",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Engage with peers and instructors in our vibrant learning community.",
    },
    {
      icon: Award,
      title: "Recognized Certifications",
      description: "Earn certificates valued by top employers worldwide.",
    },
    {
      icon: Zap,
      title: "Interactive Content",
      description:
        "Enjoy dynamic, engaging lessons with hands-on projects and quizzes.",
    },
  ];

  const teamMembers = [
    { name: "Alex Johnson", role: "Founder & CEO" },
    { name: "Sarah Lee", role: "Head of Content" },
    { name: "Michael Chen", role: "Lead Developer" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About EduHub</h1>
            <p className="text-xl mb-8">
              Empowering learners worldwide through accessible, high-quality
              education.
            </p>
            <Button
              onClick={() => navigate("/courses")}
              variant="secondary"
              size="lg"
            >
              Explore Courses
            </Button>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <p className="text-xl text-center max-w-3xl mx-auto">
              At EduHub, we believe that education is the key to unlocking human
              potential. Our mission is to provide accessible, engaging, and
              high-quality learning experiences to students around the globe,
              fostering a community of lifelong learners.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose EduHub ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="w-10 h-10 mb-2 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of students already learning on EduHub.
            </p>

            <Link to="/register">
              <Button variant="secondary" size="lg">
                {" "}
                Sign Up Now{" "}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
