import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Lock, Bell, BookOpen, LogOut } from "lucide-react";
import { UserData } from "@/context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    setUser([]);
    toast.success("Logged Out Successfully");
    navigate("/login");
  };
  return (
    <div>
      {user && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage
                    src="/placeholder.svg?height=128&width=128"
                    alt="User avatar"
                  />
                  <AvatarFallback className="text-8xl font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
            <Card className="md:col-span-2">
              <Tabs defaultValue="account">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details here
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="flex">
                        <User className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex">
                        <Mail className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          defaultValue="john.doe@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="flex">
                        <Lock className="w-4 h-4 mr-2 mt-3 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          defaultValue="********"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </TabsContent>
                <TabsContent value="preferences">
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your account
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/courses">
                      <Button>
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Learning Dashboard
                      </Button>
                    </Link>
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
