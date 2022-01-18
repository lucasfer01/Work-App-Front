import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div>
      <h1>Home Screen</h1>
      {/*Este boton deberia ir en la navbar */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
