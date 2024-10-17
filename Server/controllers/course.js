import tryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/Lecture.js";
import { User } from "../models/user.js";
import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.js";

export const getAllCourses = tryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = tryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  res.json({
    course,
  });
});

export const fetchLectures = tryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }
  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });
  res.json({
    lectures,
  });
});

export const fetchLecture = tryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }
  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });
  res.json({
    lecture,
  });
});

export const getMyCourses = tryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });
  res.json({
    courses,
  });
});

export const checkOut = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const course = await course.findById(req.param.id);
  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You are already subscribed to this course",
    });
  }
  const options = {
    amount: course.price * 100,
    currency: "INR",
    receipt: `receipt_order_1`,
  };
  const order = instance.orders.create(options);
  res.status(201).json({
    order,
    course,
  });
});

export const paymentVerification = tryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuntheitic = expectedSignature === razorpay_signature;

  if (isAuntheitic) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.param.id);

    user.subscription.push(course._id);

    await user.save();

    res.status(200).json({
      message: "Payment Successful",
    });
  } else {
    return res.status(400).json({
      message: "Payment Verification Failed",
    });
  }
});
