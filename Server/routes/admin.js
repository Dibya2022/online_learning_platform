import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  AddLectures,
  createCourse,
  deleteCourse,
  deletLecture,
  getAllStats,
  getAllUser,
  updateRole,
} from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";
import { getMyCourses } from "../controllers/course.js";

const router = express.Router();

router.post("/course/new", uploadFiles, isAuth, isAdmin, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadFiles, AddLectures);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deletLecture);
router.get("/stats", isAuth, isAdmin, getAllStats);
router.get("/mycourse", isAuth, getMyCourses);
router.put("/user/:id", isAuth, isAdmin, updateRole);
router.get("/users", isAuth, isAdmin, getAllUser);

export default router;
