import axios from "axios";
import { POST_USER } from "../enviroment";
import { types } from "../types/types";


export const getUsers = () => {
  return async (dispatch) => {
    await axios
      .get(POST_USER)
      .then(({ data }) => {
        dispatch(saveAllUsers(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const saveAllUsers = (data) => ({
    type: types.getUsers,
    payload: data,
  });