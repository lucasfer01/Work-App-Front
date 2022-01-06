import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { NavBar } from "../components/auth/NavBar/NavBar.js";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route exact path="nav" element={<NavBar />} />
          <Route exact path="login" element={<LoginScreen />} />
          <Route exact path="register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </div>
  );
};
