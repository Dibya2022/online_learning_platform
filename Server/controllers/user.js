import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import tryCatch from "../middlewares/tryCatch.js";

export const register = tryCatch(async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Email, password, and name are required",
    });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  // OTP generate
  const otp = Math.floor(Math.random() * 1000000);

  // Activation Token
  const activationToken = jwt.sign(
    { user, otp },
    process.env.ACTIVATION_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "Online Learning", data);
  res.status(200).json({
    message: "Otp sent to your mail",
    activationToken,
  });
});

export const verifyUser = tryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  if (!otp || !activationToken) {
    return res.status(400).json({
      message: "OTP and activation token are required",
    });
  }

  let verify;
  try {
    verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET_KEY);
  } catch (error) {
    return res.status(400).json({
      message: "Otp Expired",
    });
  }

  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Wrong Otp",
    });
  }

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });
  res.json({
    message: "User Registered",
  });
});

export const loginUser = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.jwt_Sec, {
    expiresIn: "7d",
  });
  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = tryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});
