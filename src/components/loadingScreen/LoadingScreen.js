import React from "react";
import "./loadingScreen.css"

export const LoadingScreen = () => {
  return (
    <div id="loading__main">
      <div className="loading__loader"></div>
      <h2 className="mt-4">Loading...</h2>
    </div>
  );
};
