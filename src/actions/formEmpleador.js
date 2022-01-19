// impprtamos axios
import axios from "axios";
// url post
import { POST_JOB, POST_URL, POST_USER_JOB } from "../enviroment";
import { types } from "../types/types";

// Post
export const postPost = async (dataPost) => {
  // post data
  const { data } = await axios.post(POST_URL, { ...dataPost });

  // Conectar post ocn empleo
  // await axios.post(`${POST_URL}/${data.post_id}/`)

  return data;
};

export const getPosts = () => {
  return (dispatch) => {
    axios
      .get(POST_URL)
      .then(({ data }) => {
        dispatch({ type: types.getPosts, payload: data });
      })
      .catch((e) => {
        alert(e);
      });
  };
};

export const setFilters = (data) => {
  return (dispatch) => {
    dispatch({ type: types.setFilters, payload: data });
  };
};

//Relacionar el post con el job
export const setPostJob = async (post_id, job_id) => {
  console.log(post_id, job_id);
  await axios
    .post(`${POST_JOB}/${post_id}/${job_id}`)
    .then((res) => console.log(res))
    .catch((e) => {
      console.log("falla en setPostJob");
      alert(e);
    });
};
