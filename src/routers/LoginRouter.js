import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { HomeScreen } from "../components/home/HomeScreen";

export const LoginRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="*" element={<HomeScreen />} />
        </Routes>
      </div>
    </div>
  );
};
