import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  loginFormScreen,
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { ForgetPassScreen } from "./ForgetPassScreen";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const handleLoginForm = () => {
    dispatch(loginFormScreen("register"));
  };

  return (
    <>
      <h3 className="text-center my-2">Login</h3>
      <form
        className="animate__animated animate__fadeIn animate__faster mt-2"
        onSubmit={handleLogin}
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input mt-2"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <button
          type="button"
          className="btn btn-link mt-2"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Forget password?
        </button>

        <hr />

        <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <hr />
        <button
          type="button"
          onClick={handleLoginForm}
          className="btn btn-success text-white link my-2 mx-auto w-50"
        >
          Create new account
        </button>
      </form>
      
      <ForgetPassScreen />
    </>
  );
};
