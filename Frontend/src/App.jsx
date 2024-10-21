import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/Loading/Loading";
import Courses from "./pages/Courses/Courses";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import PaymentSucess from "./pages/PaymentSucess/PaymentSucess";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseStudy from "./pages/CourseStudy/CourseStudy";
import Lecture from "./pages/Lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AddCourse from "./AddCourse/AddCourse";
import AdminUser from "./admin/Users/AdminUser";

const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : Login}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-sucess/:id"
              element={isAuth ? <PaymentSucess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            {/* <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            /> */}
            <Route
              path="/lecture/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/add-course"
              element={isAuth ? <AddCourse user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUser user={user} /> : <Login />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
