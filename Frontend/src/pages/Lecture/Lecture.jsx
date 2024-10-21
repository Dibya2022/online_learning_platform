import Loading from "@/components/Loading/Loading";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null); // Selected lecture
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false); // To show or hide Add Lecture form

  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null); // Currently selected lecture for viewing
  const params = useParams();
  const navigate = useNavigate();

  // Check if user has access
  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  // Fetch all lectures for the current course
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // Fetch a specific lecture by its ID
  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setCurrentLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setVideo(file);
    };
  };

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      fetchLectures();
      setBtnLoading(false);
      setShow(false);
    } catch (error) {
      console.log("Error adding lecture:", error);
      toast.error("Failed to add the lecture.");
      setBtnLoading(false);
    }
  };

  // Function to delete a lecture (admin only)
  async function handleDelete(lectureId) {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(
          `${server}/api/lecture/${lectureId}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);

        if (currentLecture && currentLecture._id === lectureId) {
          setLecture(null);
          setCurrentLecture(null); // Clear the currently selected lecture
        }
        fetchLectures(); // Refresh the lectures list after deletion
      } catch (error) {
        console.log("Error deleting lecture:", error);
      }
    }
  }

  useEffect(() => {
    fetchLectures(params.id);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col lg:flex-row h-screen bg-background text-foreground">
          {/* Left section: Video Player and Lecture Details */}
          <div className="lg:w-2/3 p-4">
            {lecLoading ? (
              <Loading />
            ) : (
              <>
                {lecture && lecture.video ? (
                  <>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <video
                        src={`${server}/${lecture.video}`}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        autoPlay
                        className="w-full h-full"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <h2 className="text-2xl font-bold mt-4">{lecture.title}</h2>
                    <p className="text-muted-foreground">
                      Description: {lecture.description}
                    </p>
                  </>
                ) : (
                  <h1>Please Select a Lecture</h1>
                )}
              </>
            )}
          </div>

          {/* Right section: Lecture List and Add Lecture Form */}
          <div className="lg:w-1/3 p-4 border-l">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Lecture List</h3>
              {user && user.role === "admin" && (
                <Button onClick={() => setShow(!show)}>
                  {show ? "Cancel" : "Add Lecture"}
                </Button>
              )}
            </div>

            {show && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-semibold">Add New Lecture</h3>
                <Input
                  placeholder="Lecture Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Lecture Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("video-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" /> Choose Video File
                  </Button>
                </div>
                {previewUrl && (
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <video src={previewUrl} controls className="w-full h-full">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                <Button disabled={btnLoading} type="submit">
                  {btnLoading ? "Please Wait...." : "Add Lecture"}
                </Button>
              </form>
            )}

            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {lectures.length > 0 ? (
                lectures.map((lecture, i) => (
                  <div
                    key={lecture.id}
                    className={`p-2 rounded-lg ${
                      currentLecture?.id === lecture.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div
                        onClick={() => fetchLecture(lecture._id)}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{lecture.title}</span>
                      </div>

                      {/* Conditionally show Delete button for admin */}
                      {user && user.role === "admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-400"
                          onClick={() => handleDelete(lecture._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Lectures Yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
