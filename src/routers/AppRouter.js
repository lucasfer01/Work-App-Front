import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { LoginRouter } from "./LoginRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
// import { NavBar } from "../components/auth/NavBar/NavBar.js";
import Landing from "../components/Landing/Landing";
import { LoadingScreen } from "../components/loadingScreen/LoadingScreen";
import Sidebar from "../components/nav/Sidebar";


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
      } else {
        setIsLoggedIn(false);
      }
      setchecking(false);
    });
  }, [dispatch, setchecking, setIsLoggedIn]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute isAuthenticated={isLoggedIn}>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute isAuthenticated={isLoggedIn}>
                <Sidebar />
                <LoginRouter />
              </PrivateRoute>
            }
          />
          {/* No poner más rutas aquí, pornerlas en LoginRouter.js */}
        </Routes>
      </Router>
    </div>
  );
};
