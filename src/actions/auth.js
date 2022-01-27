import Swal from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";

import { googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { POST_USER } from "../enviroment";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        registerUserDB(user);
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(finishLoading());
        Swal.fire("Error", "User or email are not valid", "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        await updateProfile(user, { displayName: name });
        registerUserDB(user);
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Email already registered", "error");
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      registerUserDB(user);
      dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
    });
  };
};

export const registerUserDB = async (user) => {
  const { displayName, photoURL, email, uid } = user;
  const data = {
    usr_id: uid,
    usr_email: email,
    usr_username: displayName,
    /* usr_photo: photoURL, */
  };

  console.log(data);

  await axios
    .post(POST_USER, data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const startResetPassword = (email) => {
  return () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email);
  };
};

export const login = (uid, displayName, email, photoURL) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    email,
    photoURL,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});

export const loginFormScreen = () => ({
  type: types.loginFormScreen,
});
