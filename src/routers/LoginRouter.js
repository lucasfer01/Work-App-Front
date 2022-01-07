import React from "react";
import { Routes, Route } from "react-router-dom";
/* import { HomeScreen } from "../components/home/HomeScreen"; */
import Home from "../components/Home/Home";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";

export const LoginRouter = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="home" element={<Home type="jobs" />} />
          <Route path="profile" element={<ProfileDetails />} />
          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
