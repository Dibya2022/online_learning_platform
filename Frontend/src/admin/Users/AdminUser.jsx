import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const AdminUser = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const [users, setUsers] = useState([]);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(users);
  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update the role")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchUser();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-5">User List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {users &&
            users.map((e, i) => (
              <TableBody key={i}>
                <TableRow>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                      onClick={() => updateRole(e._id)}
                    >
                      {e.role === "user" ? "Make Admin" : "Make User"}
                    </button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
      </div>
    </Layout>
  );
};

export default AdminUser;
