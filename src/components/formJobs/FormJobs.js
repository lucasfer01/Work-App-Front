import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, saveJob } from "../../actions/formJobs";
import { removeError, setError } from "../../actions/ui";
import "./FormJobs.css";

export const FormJobs = () => {
  const dispatch = useDispatch();
  const { allJobs } = useSelector((state) => state.jobs);
  const { uid } = useSelector((state) => state.auth);
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, setFormValues] = useState({
    job: "",
    id: null,
  });
  const [hideList, setHideList] = useState(false);
  const [jobMsg, setJobMsg] = useState("light");

  const { job, id } = formValues;

  const saveNewJob = (e) => {
    e.preventDefault();
    if (!id) {
      setJobMsg("danger");
      dispatch(setError("Porfavor seleccione un trabajo de la lista"));
      return false;
    }
    try {
      saveJob(uid, id);
      setFormValues({
        job: "",
        id: null,
      });
      setJobMsg("success");
      dispatch(setError("Trabajo agregado correctamente"));
      window.location.reload();
    } catch (error) {
      setJobMsg("danger");
      dispatch(setError("Error en el servidor, porfavor intentelo mas tarde!"));
    }
  };

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value, id: null });
    setHideList(false);
  };

  const selectJob = (value) => {
    setFormValues({ ...formValues, job: value.job_name, id: value.job_id });
    setHideList(true);
  };

  const habdleMsgClose = () => {
    dispatch(removeError());
  };

  useEffect(() => {
    if (allJobs.length <= 0) {
      dispatch(getJobs());
    }
  }, [dispatch, allJobs]);

  return (
    <div>
      {/*       <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addJobModal"
        style={{ zIndex: 99999 }}
      >
        Add a job
      </button> */}

      <div
        className="modal fade"
        id="addJobModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content p-2">
            <button
              type="button"
              className="close btn btn-link text-right text-decoration-none"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <form
              onSubmit={saveNewJob}
              className="form-group mt-4 mx-auto px-4 w-100"
            >
              <div className="mb-3 addJob">
                {msgError && (
                  <div
                    className={`alert alert-${jobMsg} alert-dismissible fade show`}
                    role="alert"
                  >
                    {msgError}
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={habdleMsgClose}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                {/* ---- */}
                <label style={{ color: "#000" }}>
                  Escribe y selecciona un trabajo de la lista
                </label>
                <input
                  type="text"
                  name="job"
                  className="form-control"
                  placeholder="Ejemplo: Plomero"
                  autoComplete="off"
                  value={job}
                  onChange={handleInputChange}
                />
                <ul className="jobs-list">
                  {job !== "" && !hideList
                    ? allJobs
                        .filter((value) =>
                          value.job_name
                            .toLowerCase()
                            .includes(job.toLowerCase())
                        )
                        .map((value) => (
                          <li
                            key={value.job_id}
                            onClick={() => selectJob(value)}
                          >
                            {value.job_name}
                          </li>
                        ))
                    : ""}
                </ul>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
