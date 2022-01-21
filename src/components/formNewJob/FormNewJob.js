import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const FormNewJob = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChanges, reset] = useForm({
    job: "",
  });
  const { job } = formValues;

  const alertClose = () => {
    dispatch(removeError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job.length < 3) {
      dispatch(setError("Introduce un nombre valido"));
      return false;
    }
    try {
      //TODO
      //enviar la solicitud al backend para que la puede ver el admin de la aplicacion
      Swal.fire(
        "Request sent",
        "We attend your request as soon as possible. Thanks!!",
        "success"
      );
      dispatch(removeError());
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Oops...",
        "Something went wrong, please try again later!",
        "error"
      );
    }
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="ml-4">
        {msgError && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {msgError}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={alertClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <label>Que trabajo te gustaria que añadieramos?</label>
        <br />
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleInputChanges}
        />
        <br />
        <button type="submit" className="btn btn-primary mt-2">
          Enviar
        </button>
      </form>
    </div>
  );
};
