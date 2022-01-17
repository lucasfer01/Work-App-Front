import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { getPostDetail } from "../../controllers";
import { style } from "@mui/system";
import Chat from "../chat/chat";

export default function PostDetail() {
    const [post, setPost] = useState([]);
    const [viewChat, setViewChat] = useState(false);
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
        <>
           {post.post_id? <div className={styles.container}>
                <div className={styles.fecha}>fecha de publicación: {post.createdAt.slice(0, 10)}</div>
                <div className={styles.subContainer}>
                    <div className={styles.header}>
                        <h1>{post.post_title}</h1>
                        <h4 style={{color: "red"}}>{post.post_priority? post.post_priority: <span>Poco urgente</span>}</h4>
                    </div>
                    <div className={styles.descripcion}>
                        {post.post_description}
                    </div>
                    <div className={styles.pago}>
                       <h4>Pago: {post.post_fee? post.post_fee: <span>Por acordar</span>}</h4>
                    </div>
                    <div className={styles.imagenes}>
                        {post.post_photo.length > 0? post.post_photo.map(foto => {
                            return (<img className={styles.imagen} src={foto}/>)
                        }): <span>No hay fotos en esta publicación</span>}
                    </div>
                </div>
                <button onClick={() => setViewChat(true)}>Abrir chat</button>
                {viewChat && <Chat userid={post.usr_id}/>}
            </div>: <h1>No se encontraron datos de este usuario</h1>}
        </>
    );
};
