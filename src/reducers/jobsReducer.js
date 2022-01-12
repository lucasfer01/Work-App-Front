import { types } from "../types/types";

const initialState = {
  allJobs: [],
};

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.formAddJobs:
      return {
        ...state,
        allJobs: action.payload,
      };

    default:
      return state;
  }
};
