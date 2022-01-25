import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { profileReducer } from "../reducers/profileReducer";
import { jobsReducer } from "../reducers/jobsReducer";
import {  postsReducer } from '../reducers/postsReducer'
import { usersReducer } from "../reducers/usersReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  jobs: jobsReducer,
  posts: postsReducer, 
  profile: profileReducer,
  users: usersReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
