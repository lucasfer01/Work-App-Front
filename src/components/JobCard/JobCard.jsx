import React from "react";
import {Link} from "react-router-dom";
import styles from "./JobCard.module.css";

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