import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMG, POST_USER } from "../../enviroment";
import axios from 'axios';

import "./CardProfileUser.css";

export const CardProfileUser = (userData) => {
  let { id, name, job, desc, img_url } = userData;
  let rating = Math.round(userData.rating * 10) / 10;
  if (!rating) rating = 0;
  if (!desc) desc = "";
  if (!img_url) {
    img_url = IMG
  }

  const [score, setScore] = useState(1);

  useEffect(() => {
    axios.get(`${POST_USER}/${id}`)
      .then(user => setScore(user.data.usr_score))
      .catch(error => console.log(error));
  },[]);


  const maxStars = 5;
  const starsArr = [];
  const starClasses = ["fas fa-star", "fas fa-star-half-alt", "far fa-star"];

  const userStars = (userRating) => {
    for (let i = 0; i < maxStars; i++) {
      let indexStarClass = 0;
      if (i < userRating && i + 1 > userRating) indexStarClass = 1;
      else if (i >= userRating) indexStarClass = 2;
      starsArr.push(
        <li key={i}>
          <i className={`${starClasses[indexStarClass]}`}></i>
        </li>
      );
    }
    return starsArr;
  };

  return (
    <div style={userData.style}>
      <div className="card card__user-profile mt-3 mb-1">
        <img src={img_url} className="img-fluid" alt="job" />
        <div className="card-body">
          <div className="text-right mb-2">
            <h5 className="card-title mb-0">{job}</h5>
            <Link to={`/profile/${id}`} className="text-end text-muted">
              {name}
            </Link>
          </div>
          <p className="card-text">{desc}</p>
          <div className="starsRatingContainer">
            
            {score ? (
              <span className="mr-4">{score}⭐</span>
            ) : (
              <small>Aun no tiene calificaciones</small>
            )}
          </div>

          <Link to={`/profile/${id}`} className="btn btn-primary mt-3">
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
