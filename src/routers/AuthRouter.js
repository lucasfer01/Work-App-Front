import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { NavBar } from "../components/auth/NavBar/NavBar.js";
import { SearchBar } from '../components/SearchBar/SearchBar';

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route  path="nav" element={<NavBar  />} />
          <Route  path="ser" element={<SearchBar />} />
          <Route exact path="login" element={<LoginScreen />} />
          <Route exact path="register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </div>
  );
};
