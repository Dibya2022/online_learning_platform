import tryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";

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
