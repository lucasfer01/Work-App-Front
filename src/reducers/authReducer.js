import { types } from "../types/types";

const initialState = {
  loginScreenActive: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
      };
    case types.logout:
      return {};

    case types.loginFormScreen:
      return { ...state, loginScreenActive: !state.loginScreenActive };

    default:
      return state;
  }
};
