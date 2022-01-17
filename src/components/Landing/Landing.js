import React from "react";
import { useSelector } from "react-redux";
import { LoginScreen } from "../auth/LoginScreen";
import { RegisterScreen } from "../auth/RegisterScreen";
import "./Landing.css";

export default function Landing() {
  const { loginScreenActive } = useSelector((state) => state.auth);

  return (
    <div className="main_landing_container">
      <div className="container"></div>
      <div className="about_landing">
        <h1>WorkApp</h1>
        <p>
          Encuentra a un buen trabajador en tu zona o una nueva oportunidad de
          trabajo.
        </p>
      </div>
      <div className="login_landing">
        {loginScreenActive ? <RegisterScreen /> : <LoginScreen />}
      </div>
    </div>
  );
}
