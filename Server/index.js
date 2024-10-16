import express from "express";
import dotenv from "dotenv";

const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is Working");
});

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
