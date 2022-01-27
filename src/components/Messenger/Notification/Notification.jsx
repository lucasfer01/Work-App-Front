import React from 'react';
import "./Notification.css";

const imgDefault = "https://firebasestorage.googleapis.com/v0/b/react-eccomerce-979a7.appspot.com/o/Categorias%2FWorkingapp.jpg?alt=media&token=09c05864-0fca-4fed-8c69-e44c328b2d0e"

const Notification = ({post, jobs}) => {
    let photo = post?.post_photo.length ? post?.post_photo[0] : imgDefault
    let job = jobs?.length ? jobs[0] : "servicios que puedes ofrecer"

    return (
        <div className={'message'}>
            <div className='messageTop'>
                <img className='messageImg'
                src={photo}
                alt=""
                />
                <p className='messageText'>Alguien necesita {job} </p>
                <p className='messageText'>{post?.post_title}</p>
            </div>
            <div className='messageBottom'>{post?.createdAt}</div>
        </div>
    )
}

export default Notification;