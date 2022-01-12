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

  const { job, id } = formValues;

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const saveNewJob = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(setError("Please select one job that are in the list"));
      return false;
    }
    console.log(uid, id);
    saveJob(uid, id);
    setFormValues({
      job: "",
      id: null,
    });
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

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addJobModal"
      >
        Add a job
      </button>

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
                    className="alert alert-danger alert-dismissible fade show"
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
                <label>Write and select one job</label>
                <input
                  type="text"
                  name="job"
                  className="form-control"
                  placeholder="Example: Plumber"
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
