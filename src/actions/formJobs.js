import axios from "axios";

import { JOB_URL, POST_USER_JOB } from "../enviroment";
import { types } from "../types/types";

export const getJobs = () => {
  return async (dispatch) => {
    await axios
      .get(JOB_URL)
      .then(({ data }) => {
        dispatch(saveAllJobs(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const saveJob = async (userId, jobId) => {
  await axios
    .post(`${POST_USER_JOB}/${userId}/${jobId}`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const saveAllJobs = (data) => ({
  type: types.formAddJobs,
  payload: data,
});
