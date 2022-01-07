import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { HomeScreen } from "../components/home/HomeScreen";

export const LoginRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </>
  );
};
