import React from 'react';
import "./Notification.css";

const Notification = ({post, jobs}) => {

    return (
        <div className={'message'}>
            <div className='messageTop'>
                <img className='messageImg'
                src={post?.post_photo[0]}
                alt=""
                />
                <p className='messageText'>Alguien necesita </p>
                <p className='messageText'>{post?.post_title}</p>
            </div>
            <div className='messageBottom'>post.createdAt</div>
        </div>
    )
}

export default Notification;