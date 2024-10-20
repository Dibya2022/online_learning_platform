import tryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/user.js";
import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.js";

// Get all courses
export const getAllCourses = tryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

// Get single course
export const getSingleCourse = tryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  res.json({
    course,
  });
});

// Fetch all lectures for a course
export const fetchLectures = tryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });
  const user = await User.findById(req.user._id);

  // Admin access
  if (user.role === "admin") {
    return res.json({ lectures });
  }

  // Check if user is subscribed
  if (!user.subscription.includes(req.params.id)) {
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });
  }

  res.json({
    lectures,
  });
});

// Fetch single lecture by ID
export const fetchLecture = tryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  const user = await User.findById(req.user._id);

  // Admin access
  if (user.role === "admin") {
    return res.json({ lecture });
  }

  // Check if user is subscribed
  if (!user.subscription.includes(lecture.course)) {
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });
  }

  res.json({
    lecture,
  });
});

// Get all courses the user is subscribed to
export const getMyCourses = tryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: { $in: req.user.subscription } });
  res.json({
    courses,
  });
});

// Checkout for course subscription
export const checkOut = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  // Check if user is already subscribed to the course
  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You are already subscribed to this course",
    });
  }

  // Create Razorpay order
  const options = {
    amount: course.price * 100, // Razorpay expects the amount in paise (INR subunit)
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  const order = await instance.orders.create(options);

  res.status(201).json({
    order,
    course,
  });
});

// Payment verification
export const paymentVerification = tryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Creating the hash to validate the payment
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Save payment details
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Add course to user's subscription
    const user = await User.findById(req.user._id);
    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);
    await user.save();

    res.status(200).json({
      message: "Payment Successful",
    });
  } else {
    res.status(400).json({
      message: "Payment Verification Failed",
    });
  }
});
