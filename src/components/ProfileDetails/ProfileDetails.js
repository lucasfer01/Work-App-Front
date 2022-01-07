import React from "react";
import { NavBar } from "../auth/NavBar/NavBar";

export const ProfileDetails = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqph.fs.quoracdn.net%2Fmain-qimg-7ca600a4562ef6a81f4dc2bd5c99fee9-c&f=1&nofb=1"
          alt="profilePicture"
        ></img>
        <span>info personal</span>
      </div>
      {/* Cards de jobs y posts ↓ */}
      <div> 
        <h3>Job 1</h3>
        <h3>Job 2</h3>
        <h3>Job 3</h3>
      </div>
      <div>
        <h3>Post 1</h3>
        <h3>Post 2</h3>
        <h3>Post 3</h3>
      </div>
    </div>
  );
};
