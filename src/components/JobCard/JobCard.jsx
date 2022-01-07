import React, { useEffect, useState } from "react";
import { getJobs } from "../../controllers";
import {Link} from "react-router-dom";
import styles from "./JobCard.module.css";
const image = "https://cursosvirtualesgratis.com/wp-content/uploads/2020/09/donde-aprender-carpinteria-cursos-de-carpinteria.jpg"

export default function JobCard(props) {
    return (
        <div className={styles.container}>
            <Link to={`/job/${props.id}`}>
                <div className={styles.divCard}>
                <div className={styles.title}>
                    <h5>{props.name}</h5>
                </div>
                </div>
            </Link>
        </div>
    );
};