import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { getPostDetail } from "../../controllers";

export default function PostDetail() {
    const [post, setPost] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getPostData = async () => {
            try {
                const postData = await getPostDetail(id);
                console.log("post:", postData)
                setPost(postData);
            } catch (error) {
                console.log(error);
            }
        };
        getPostData();
    }, [id]);

    return (
        <div className={styles.container}>
            <div>
                <h3>{post.post_title}</h3>
            </div>
            <div className={styles.body}>
                <div>
                    <span>{post.createdAt}</span>
                    <div>
                        <p>{post.post_description}</p>
                    </div>
                </div>
                <div className={styles.divimg}>
                    <img src={post.post_photo} alt="post" />
                </div>
            </div>
            <div className={styles.footer}>
                <span>Pago: {post.post_fee}</span>
                <span>Prioridad: {post.post_priority}</span>
                <input type="button" value="Contacto" />
            </div>
        </div>
    );
};

