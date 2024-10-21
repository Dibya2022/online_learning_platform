import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/admin/utils/Layout";
import axios from "axios";
import { server } from "@/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Video } from "lucide-react";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [stats, setStats] = useState({});

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats); // Properly update the stats state
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Courses Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalCourses || 0}
                </div>
              </CardContent>
            </Card>

            {/* Total Lectures Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Lectures
                </CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalLectures || 0}
                </div>
              </CardContent>
            </Card>

            {/* Total Users Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalUsers || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Sections */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>New user registered</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      2 min ago
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>New course published</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      1 hour ago
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    <span>Payment received</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      3 hours ago
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <button
                    onClick={() => navigate(`/admin/add-course`)}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                  >
                    Add New Course
                  </button>
                  <button className="w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20">
                    View All Users
                  </button>
                  {/* <button className="w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20">
                    Generate Report
                  </button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
