import React from "react";
import { Link } from "react-router-dom";

import "./CardProfileUser.css";

export const CardProfileUser = (userData) => {
  const { id, name, job, desc, img_url } = userData;
  let rating = Math.round(userData.rating * 10) / 10;

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
    <div className="col-12 col-md-4 col-xl-3">
      <div className="card card__user-profile mt-3 mb-1">
        <img src={img_url} className="img-fluid card-img-top" alt="job" />
        <div className="card-body">
          <div className="text-right mb-2">
            <h5 className="card-title mb-0">{job}</h5>
            <Link to="/test" className="text-end text-muted">
              {name}
            </Link>
          </div>
          <p className="card-text">{desc}</p>
          <div className="starsRatingContainer">
            <ul className="starsRatingList">{userStars(rating)}</ul>
            <span>{Math.round(rating * 10) / 10} / 5</span>
          </div>
          <Link to={`/profile/${id}`} className="btn btn-primary mt-3">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
