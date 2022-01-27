import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./postCard.css";
import { getProfile } from "../../controllers";
import { IMG} from "../../enviroment"

export default function PostCard(props) {
    const authorId = props.authorId;
    const [author, setAuthor] = useState({});
    let photo = author.usr_photo ? author.usr_photo : IMG;

    useEffect(() => {
        getProfile(authorId).then(res => {
            setAuthor(res);
        }).catch(err => {
            console.log(err);
        });
    }, [authorId]);

    console.log("author", author);

    return (
        <div className='card-emple'>
            <div className='img-sec'>
                <img className='imagen' src={props.photo} alt="post..." />
            </div>
            <div className='info'>
                <Link to={`/profile/${author?.usr_id}`}>
                    <img className='conversationImg'
                        src={photo}
                        alt="asdasfd"
                    />
                    <h2>{author?.usr_username}</h2>
                </Link>
                <Link to={`/post/${props.id}`}>
                    <h2>{props.title}</h2>
                </Link>
                <p className='main-paragraph'>{props.description}
                </p>
                <div className='overviews'>
                    <div className='overview'>
                        <span className='pret'>Pago pretendido:
                            <span className='sueldo'>{props.fee}</span>
                        </span>
                        <p className='disp'>Prioridad:<p className='tiempo'>{props.priority}</p></p>
                    </div>
                </div>
                <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <Link to={`/post/${props.id}`}>
                        <span class="button-text">MAS INFORMACION</span>
                    </Link>
                </button>
            </div>
        </div>
    );
};