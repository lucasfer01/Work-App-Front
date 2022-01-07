import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

export default function PostCard(props) {
    return (
        <div className={styles.container}>
            <Link to={`/post/${props.id}`}>
                <div className={styles.divCard}>
                    <div className={styles.title}>
                        <h5>{props.title}</h5>
                    </div>
                    <div className={styles.description}>
                        <p>{props.description}</p>
                    </div>
                    <div className={styles.foot}>
                        <p>{props.fee}</p>
                        <p>{props.priority}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};