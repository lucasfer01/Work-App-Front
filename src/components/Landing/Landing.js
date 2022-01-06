import React from "react";
import './Landing.css'
import { LoginScreen } from "../auth/LoginScreen";
import {useNavigate} from 'react-router'

export default function Landing(isAuthenticated){
    const navigate = useNavigate(); 
    React.useEffect(()=>{
        if(isAuthenticated.isAuthenticated){navigate('/home')}

    },[isAuthenticated])
    return (
        <div className='main_landing_container'>
            <div  className="about_landing">
                <h1>WorkApp</h1>
                <p>Encuentra a un buen trabajador en tu zona o una nueva oportunidad de trabajo. </p>
            </div>
            <div className="login_landing">
                <LoginScreen/>
            </div>
        </div>
    )
}