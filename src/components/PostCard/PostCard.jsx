import React from "react";
import { Link } from "react-router-dom";
import styles from "./PostCard.module.css";

export default function PostCard(props) {
    return (
        <div className={styles.container}>
            <div className={styles.divCard}>
                <Link to={`/post/${props.id}`}>
                    <div className={styles.title}>
                        <h5>{props.title}</h5>
                    </div>
                </Link>
                <div className={styles.description}>
                    <p>{props.description}</p>
                    <img src={props.photo} alt="post" />
                </div>
                <div className={styles.foot}>
                    <p>Pago: {props.fee}</p>
                    <p>Prioridad: {props.priority}</p>
                    <Link to={`/post/${props.id}`}>
                        <p>More info</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};