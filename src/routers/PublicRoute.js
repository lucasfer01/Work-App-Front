import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated? <Navigate to='/home'/>: children
};
