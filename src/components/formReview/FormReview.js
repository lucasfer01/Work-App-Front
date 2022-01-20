import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setError, removeError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import "./FormReview.css";

export const FormReview = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [starsPainting, setStarsPainting] = useState(0);
  const [starStatus, setStarStatus] = useState(true);
  const [tempStars, setTempStars] = useState(starsPainting);
  const [formValues, handleInputChange, reset] = useForm({
    review: "",
  });
  const stars = [0, 1, 2, 3, 4];
  const { review } = formValues;

  const handleStars = (index) => {
    setStarsPainting(index + 1);
  };

  const leaveStars = () => {
    setStarsPainting(tempStars);
  };

  const setStar = (index) => {
    handleStars(index);
    setTempStars(starsPainting);
    setStarStatus(!starStatus);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    //TODO enviar al backend 
    if (starsPainting > 0 && review.length > 3) {
      console.log(starsPainting);
      console.log(review);
      setStarsPainting(0);
      setTempStars(starsPainting);
      reset();
      dispatch(removeError());
      Swal.fire("Reseña", "Reseña enviada exitosamente", "success");
    } else {
      dispatch(
        setError(
          "Debes poner una calificacion y escribir una reseña para que la reseña pueda ser enviada"
        )
      );
    }
  };

  return (
    <div className="container-fluid w-50">
      <h1>Form Review</h1>
      <div>
        {msgError && (
          <div className="alert alert-danger" role="alert">
            {msgError}
          </div>
        )}
        <p>Puntua el trabajo</p>
        <br />
        <ul className="review__stars">
          {stars.map((star, index) => (
            <li
              className="pl-2"
              key={index}
              onClick={() => setStar(star)}
              onMouseEnter={() => handleStars(star)}
              onMouseLeave={leaveStars}
            >
              {starsPainting <= index ? (
                <i className="far fa-star"></i>
              ) : (
                <i className="fas fa-star"></i>
              )}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Escribe una reseña</label>
          <textarea
            type="text"
            className="form-control"
            name="review"
            value={review}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
