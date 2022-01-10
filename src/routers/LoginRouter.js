import React from "react";
import { Routes, Route } from "react-router-dom";
/* import { HomeScreen } from "../components/home/HomeScreen"; */
import Home from "../components/home/Home";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";
import PostDetail from "../components/PostDetail/PostDetail";
// import { NavBar } from "../components/nav/Sidebar";

export const LoginRouter = () => {
  return (
    <div>
      <div>
        <Routes>

          <Route path="home" element={<Home type="posts" />} />
          <Route path="jobs" element={<Home type="jobs" />} />
          <Route path="profile/:userId" element={<ProfileDetails type="jobs" />} />
          <Route path="post/:id" element={<PostDetail />} />

          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
