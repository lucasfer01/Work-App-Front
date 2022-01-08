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
import { googleAuthProvider } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        dispatch(finishLoading());
        console.log("User or email are not valid");
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
        dispatch(login(user.uid, user.displayName));
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
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const startResetPassword = (email) => {
  return () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
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