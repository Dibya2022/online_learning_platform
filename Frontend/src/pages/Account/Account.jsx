import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { LogOut, BookOpen, AppWindowMacIcon } from "lucide-react";
import { UserData } from "@/context/UserContext";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

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
              <Tabs defaultValue="preferences">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
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
                    <Button onClick={() => navigate(`/${user._id}/dashboard`)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Learning Dashboard
                    </Button>
                    {user.role === "admin" && (
                      <Button
                        className="ml-4"
                        onClick={() => navigate(`/admin/dashboard`)}
                      >
                        <AppWindowMacIcon className="mr-2 h-4 w-4" />
                        View Admin Dashboard
                      </Button>
                    )}
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
