import React, { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "@/context/UserContext";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { btnLoading, verifOtp } = UserData();
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Timer logic for OTP resend
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setIsResendDisabled(false);
          clearInterval(interval);
        }
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle input change for OTP
  const handleChange = (element, index) => {
    if (isNaN(Number(element.value))) return false;

    // Update OTP array with the current value
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move focus to the next input field
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Submit OTP for verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // Join OTP array into a single string
    if (otpValue.length === 6) {
      try {
        await verifOtp(Number(otpValue), navigate); // Pass the string OTP
        console.log("OTP submitted:", otpValue);
      } catch (error) {
        console.error("OTP verification failed", error);
        // alert("OTP verification failed, please try again.");
      }
    } else {
      // alert("Please enter a valid 6-digit OTP");
    }
  };

  // Resend OTP logic
  const handleResend = () => {
    console.log("Resending OTP");
    // Implement the logic to resend OTP here (e.g., call a resend function)
    setTimer(30);
    setIsResendDisabled(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Email Verification
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a code to your email. Please enter it below to verify
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp-input">Enter 6-digit code</Label>
                <div className="flex justify-between max-w-xs mx-auto">
                  {otp.map((data, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="\d{1}"
                      maxLength={1}
                      className="w-12 h-12 text-center text-2xl"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                    />
                  ))}
                </div>
              </div>
              <Button disabled={btnLoading} type="submit" className="w-full">
                {btnLoading ? "Please Wait.." : "Verify Email"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              {isResendDisabled ? (
                <span>Resend in {timer}s</span>
              ) : (
                <Button variant="link" className="p-0" onClick={handleResend}>
                  Resend
                </Button>
              )}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/login">
            <Button variant="ghost" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
