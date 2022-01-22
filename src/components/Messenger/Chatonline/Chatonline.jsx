import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./chatonline.css";
import Mensajes from '../Mensajes/Mensajes';
import { getProfile } from "../../../controllers";
import Chat from '../Chat/Chat';


const Chatonline = () => {
    const myId = useSelector(state => state.auth.uid);
    const [openChat, setOpenChat] = useState(false);
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState("");
    const [messages, setMessages] = useState([]);
    const {chats} = useSelector(state => state.profile.ownProfile);
    console.log("userChats", chats);
    useEffect(() => {
        if (chats) {
            setUsers(chats?.map(chat => chat.users.find(u => u.user_id !== myId)));
        }
    }, [chats]);


    const handleOpenChat = (e) => {
        e.preventDefault();
        setOpenChat(true);
        setReceiverId(e.target.value);
    }


    return (
        <div className='chatOnline'>
            <div>
                {
                    openChat && (
                        <div className='chatBox'>
                            <button onClick={() => setOpenChat(false)}>X</button>
                            <div className='chatBoxWrapper'>
                                <div className='chatBoxTop'>
                                    <Mensajes />
                                    <Mensajes own={true} />
                                    <Mensajes />
                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea className='chatMessageInput' placeholder='Write something...'></textarea>
                                    <button className='chatSubmitButton'>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                users?.map(u => (
                    <button key={u.usr_id} value={u.usr_id} onClick={handleOpenChat}>
                        <div className='chatOnlineFriend'>
                            <div className='chatOnlineImgContainer'>
                                <img className='chatOnlineImg'
                                    src={u.usr_photo}
                                    alt=""
                                />
                                <div className='chatOnlineBadge'></div>
                            </div>
                            <span className='chatOnlineName'>{u.usr_username}</span>
                        </div>
                    </button>
                ))
            }
        </div>
    )
}

export default Chatonline
