import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = [];
  const [lecture, setLecture] = [];
  const [loading, setLoading] = useState(true);
  const [lecLOading, setLecLoading] = useState(false);
  const params = useParams();

  async function fetLectures() {
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

  useEffect(() => {
    fetLectures();
  }, []);
  return <div>Lecture</div>;
};

export default Lecture;
