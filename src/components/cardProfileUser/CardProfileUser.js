import React from "react";
import { Link } from "react-router-dom";

import "./CardProfileUser.css";

export const CardProfileUser = () => {
  const maxStars = 5;
  const starsArr = [];
  const starClasses = ["fas fa-star", "fas fa-star-half-alt", "far fa-star"];

  const userStars = (userRating) => {
    for (let i = 0; i < maxStars; i++) {
      let indexStarClass = 0;
      if (i < userRating && i + 1 > userRating) indexStarClass = 1;
      else if (i > userRating) indexStarClass = 2;
      starsArr.push(
        <li key={i}>
          <i className={`${starClasses[indexStarClass]}`}></i>
        </li>
      );
    }
    return starsArr;
  };

  return (
    <div className="card">
      <img
        src="https://www.elsoldemazatlan.com.mx/local/ipdbj7-carpintero.jpg/ALTERNATES/FREE_768/carpintero.jpg"
        className="card-img-top"
        alt="job"
      />
      <div className="card-body">
        <div className="text-right mb-2">
          <h5 className="card-title mb-0">Carpintero</h5>
          <Link to="/test" className="text-end text-muted">
            Jose Antonio Garcia
          </Link>
        </div>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className="starsRatingContainer">
          <ul className="starsRatingList">{userStars(2.2)}</ul>
          <span>2.2 / 5</span>
        </div>
        <Link to="/test" className="btn btn-primary mt-3">
          View Profile
        </Link>
      </div>
    </div>
  );
};
