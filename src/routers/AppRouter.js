import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { AuthRouter } from "./AuthRouter";
import { LoginRouter } from "./LoginRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { NavBar } from "../components/auth/NavBar/NavBar.js";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails.js"
import Landing from "../components/Landing/Landing.js";


export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setchecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        console.log("Logueado");
      } else {
        setIsLoggedIn(false);
      }
      setchecking(false);
    });
  }, [dispatch, setchecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Esperando.....</h1>;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute isAuthenticated={isLoggedIn}>
                {/* <NavBar /> */}
                <Landing />
              </PublicRoute>
              
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute isAuthenticated={isLoggedIn}>
                <LoginRouter />
              </PrivateRoute>
            }
          />
          <Route
          path= "/profile/*"
          element={
            <PrivateRoute isAuthenticated={isLoggedIn}>
              <ProfileDetails></ProfileDetails>
            </PrivateRoute>
          }
          />
        </Routes>
      </Router>
    </div>
  );
};
