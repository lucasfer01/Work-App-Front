import { types } from "../types/types";

const initialState = {
  allUsers: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getUsers:
      return {
        ...state,
        allUsers: action.payload,
      };

    default:
      return state;
  }
};
