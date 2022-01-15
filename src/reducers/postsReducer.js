import { types } from "../types/types";

const initialState = {
  allPosts: [],
  filterPost: [],
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getPosts:
      return {
        ...state,
        allPosts: action.payload,
      };
    case types.setFilters:
      return {
        ...state,
        filterPost: action.payload,
      }

    default:
      return state;
  }
};
