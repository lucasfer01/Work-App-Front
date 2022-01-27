import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Notification.css";

const imgDefault = "https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FWorkingapp.jpg?alt=media&token=09c05864-0fca-4fed-8c69-e44c328b2d0e"

const Notification = ({post, jobs}) => {
    let photo = post?.post_photo.length ? post?.post_photo[0] : imgDefault
    let job = jobs?.length ? jobs[0] : "servicios que puedes ofrecer"
    const navigate = useNavigate();
    return (
        <div className={'message'}>
            <div className='body'>
                <img className='messageImg'
                src={photo}
                alt=""
                />
                <div className='messageInfo'>
                <p className='message'>Alguien necesita {job} </p>
                <button onClick={() => navigate(`/post/${post.post_id}`)} >
                <p className='post'>{post?.post_title}</p>
                </button>
                </div>
            </div>
            <div className='messageBottom'>{post?.createdAt.slice(0, 10)}</div>
        </div>
    )
}

export default Notification;