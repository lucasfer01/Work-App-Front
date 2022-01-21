import React from 'react';
import Chat from './Chat/Chat';
import Chatonline from './Chatonline/Chatonline';
import Mensajes from './Mensajes/Mensajes';
import "./messenger.css";

const Messenger = () => {

    return (
        <div className='messenger'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    <input placeholder='Search for Contacts' className='chatMenuInput' />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                    <Chat />
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className='chatBoxTop'>
                      <Mensajes />
                      <Mensajes own={true}/>
                      <Mensajes />
                      <Mensajes />
                      <Mensajes />
                      <Mensajes own={true}/>
                      <Mensajes />
                      <Mensajes />
                      <Mensajes />
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
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                    <Chatonline />
                </div>
            </div>
        </div>
    )
}

export default Messenger
