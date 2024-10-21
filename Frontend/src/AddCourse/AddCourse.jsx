import Layout from "@/admin/utils/Layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "@/main";
import { courseData } from "@/context/CourseContext";

const categories = [
  "Web Development",
  "Mobile Development",
  "Game Development",
  "Machine Learning",
  "Data Science",
  "Artificial Intelligence",
];

const AddCourse = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnloading, setBtnLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { fetchCourses } = courseData();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if category is selected
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    setBtnLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("createdBy", createdBy);
    formData.append("duration", duration);
    formData.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      // Reset form fields
      setImage("");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setCreatedBy("");
      setDuration("");
      setImagePrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="createdBy">Created By</Label>
                <Input
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Course Image</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {imagePrev && (
                <div className="space-y-2">
                  <Label>Image Preview</Label>
                  <div className="relative w-full h-64">
                    <img
                      src={imagePrev}
                      className="object-fill w-full rounded-md h-full"
                      alt="Course image preview"
                    />
                  </div>
                </div>
              )}
              <Button type="submit" disabled={btnloading} className="w-full">
                {btnloading ? "Adding Course..." : "Add Course"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddCourse;
