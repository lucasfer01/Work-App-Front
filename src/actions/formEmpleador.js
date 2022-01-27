// impprtamos axios
import axios from "axios";
// url post
import { POST_URL } from "../enviroment";
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
