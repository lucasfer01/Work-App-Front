import React from "react";
import './Landing.css'
import {AuthRouter} from '../../routers/AuthRouter'

export default function Landing(){
    return (
        <div className='main_landing_container'>
            <div  className="about_landing">
                <h1>WorkApp</h1>
                <p>Encuentra a un buen trabajador en tu zona o una nueva oportunidad de trabajo. </p>
            </div>
            <div className="login_landing">
                <AuthRouter/>
            </div>
        </div>
    )
}