import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "@/context/UserContext";
import { courseData } from "@/context/CourseContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser, handleGoogleLoginSuccess } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { fetchMyCourse } = courseData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <GoogleOAuthProvider clientId="51593237379-ocano7gu6rid4qsq97oems91ph0tinj0.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-7 h-8 w-8"
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                <Button type="submit" disabled={btnLoading} className="w-full">
                  {btnLoading ? "Please Wait..." : "Login"}
                </Button>
              </div>
            </form>

            {/* Google Login Button */}
            <div className="mt-4">
              <GoogleLogin
                onSuccess={(credentialResponse) =>
                  handleGoogleLoginSuccess(credentialResponse, navigate)
                }
                onError={() => console.log("Google Login Failed")}
              />
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/forgot"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-gray-500">Don't have an account?</div>
            <Button variant="link" className="p-0 text-sm">
              <Link to="/register">Create an account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
