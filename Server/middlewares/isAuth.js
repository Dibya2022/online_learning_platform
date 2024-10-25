import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).json({
        message: "Please Login First",
      });
    }

    // Check if token is a Google token (usually a longer token format)
    if (token.startsWith("ey")) {
      // Handle JWT verification for regular users
      const decodedData = jwt.verify(token, process.env.jwt_Sec);
      req.user = await User.findById(decodedData._id);
    } else {
      // Handle Google token verification
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // Find or create a user based on the Google user ID
      let user = await User.findOne({ email: payload.email });
      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          password: "", // Or some placeholder as no password is needed for Google-auth users
          role: "user",
        });
      }

      req.user = user; // Attach the user to the request
    }

    if (!req.user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Login First",
    });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "You are not an admin",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
