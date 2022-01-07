import React, { useEffect, useState } from "react";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";

import { startResetPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { setError } from "../../actions/ui";

const timer = 10000;
export const ForgetPassScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [disable, setDisable] = useState(false);
  const [counter, setCounter] = useState(timer / 1000);
  const [msgClass, setMsgClass] = useState("error");

  const [formValues, handleInputChange] = useForm({
    email: "",
  });

  const { email } = formValues;

  useEffect(() => {
    if (counter > 0 && disable) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    } else {
      setCounter(timer / 1000);
    }
  }, [counter, disable]);

  const handleForgetPassword = (e, email) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      setMsgClass("error");
    } else {
      dispatch(startResetPassword(email));
      dispatch(
        setError(
          "Email sended. If you don't see the email please click again in send button"
        )
      );
      setMsgClass("success");
      setDisable(true);
      setTimeout(() => {
        setDisable(false);
      }, timer);
    }
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content p-3">
          <button
            type="button"
            className="close btn btn-link text-right text-decoration-none"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h3 className="text-center mt-2">Forget your password?</h3>
          <p className="m-auto">
            We will send you an email with instructions on how to reset your
            password.
          </p>
          <form
            className="animate__animated animate__fadeIn animate__faster mt-4"
            onSubmit={(e) => handleForgetPassword(e, email)}
          >
            {msgError && (
              <div className={`auth__alert-${msgClass}`}>{msgError}</div>
            )}
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              className="auth__input"
              autoComplete="off"
              value={email}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn btn-primary text-white link my-2 mx-auto w-50"
              disabled={disable}
            >
              Send an email
            </button>
            {disable ? (
              <p className="text-muted mb-2 ml-2">
                You can send again in {counter} seconds
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
