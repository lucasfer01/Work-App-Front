import React from "react";
import { Link } from "react-router-dom";
import "./postCard.css";

export default function PostCard(props) {
    return (
        <div className='card-emple'>
            <div className='img-sec'>
                <img className='imagen' src={props.photo} alt="post..." />
            </div>
            <div className='info'>
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