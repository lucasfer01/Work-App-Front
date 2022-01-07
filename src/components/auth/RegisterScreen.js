import React from "react";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";

import {
  loginFormScreen,
  startRegisterWithEmailPasswordName,
} from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const handleRegisterForm = () => {
    dispatch(loginFormScreen("login"));
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        setError(
          "Password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="text-center my-2">Register</h3>
      <form
        className="animate__animated animate__fadeIn animate__faster mt-2"
        onSubmit={handleRegister}
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input mt-2"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
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
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
        <hr />
        <button
          type="button"
          onClick={handleRegisterForm}
          className="link btn btn-success text-white my-2 mx-auto w-50"
        >
          Already Register?
        </button>
      </form>
    </>
  );
};
