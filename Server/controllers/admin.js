import tryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/Lecture.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/user.js";

export const createCourse = tryCatch(async (req, res) => {
  const { title, description, price, duration, category, createdBy } = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    price,
    duration,
    category,
    createdBy,
    image: image?.path,
  });
  res.status(201).json({
    message: "Course created successfully",
  });
});

export const AddLectures = tryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course)
    return res.status(404).json({
      message: "Course not found",
    });

  const { title, description } = req.body;

  const file = req.file;

  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });
  res.status(201).json({
    message: "Lecture created successfully",
    lecture,
  });
});

export const deletLecture = tryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  rm(lecture.video, () => {
    console.log("Video Deleted");
  });
  await Lecture.deleteOne();
  res.json({
    message: "Lecture Deleted",
  });
});

const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = tryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  const lectures = await Lecture.find({ course: course._id });
  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("Video Deleted");
    })
  );
  rm(course.image, () => {
    console.log("Image Deleted");
  });
  await Courses.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });
  res.json({
    message: "Course Deleted",
  });
});

export const getAllStats = tryCatch(async (req, res) => {
  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
  };
  res.json({
    stats,
  });
});
