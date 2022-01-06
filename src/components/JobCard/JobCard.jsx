import React, { useEffect, useState } from "react";
import { getJobs } from "../../controllers";
const image = "https://cursosvirtualesgratis.com/wp-content/uploads/2020/09/donde-aprender-carpinteria-cursos-de-carpinteria.jpg"

export default function JobCard(props) {
    return (
        <div class="card bg-dark text-white">
            <img src={image} class="card-img" alt="Img not found"/>
                <div class="card-img-overlay">
                    <h5 class="card-title">{props.name}</h5>
                    <p class="card-text">{props.description}</p>
                </div>
        </div>
    );
};