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
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;