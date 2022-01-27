import React from "react";
import Mapa from "../Mapa/Mapa";
import './EditUbicacion.css'
import Boton from '../Boton/Boton'
import Geocode from 'react-geocode'
import axios from "axios";
import { POST_USER } from "../../enviroment";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router'

// Renderizar este componente como un pop up, no como una ruta

export default function EditUbicacion({profile, id}){

    const [state, setState] = React.useState(''); 
    const [position, setPosition] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)
    const [perfil, setPerfil] = React.useState('')

    const navigate = useNavigate(); 
    
    React.useEffect(()=>{setPerfil(profile)},[profile]); 
 
    Geocode.setLanguage("es");
    Geocode.setApiKey("AIzaSyAf33rszL-PaMcLx9peQiwUgdDFwJiBxLc");

    React.useEffect(()=>{
        var a = 1; 
        a += 1; 
        if (a > 20) return 0
        if(position){
          setPerfil({...perfil, usr_location: position}); 
        }
        else {
            if (window.navigator) {
                window.navigator.geolocation.getCurrentPosition((pos=>{setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude})}),(err=>alert("error al acceder a la ubicación: ", err.message))) 
            }
        }
        }, [position]) 

    function getCords(){
        Geocode.fromAddress(state).then(
            (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setPosition({lat: lat, lng: lng})
            },
            (error) => {
            alert(error);
            }
        );
    }

    async function onSubmit(){

     
        setPerfil({...perfil, usr_location: position})
        console.log("perfil enviado", perfil)
        
        await axios
        .put((POST_USER + "/"  + id), perfil)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        window.location.replace('');
    }

    return (
        <div
        className="modal fade"
        id="editUbicacion"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editUbicacionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content p-3 formEmpleado_main">
            <button
              type="button"
              className="close btn btn-link text-right text-decoration-none"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
        <div className='editUbicacion_main'>
            <h3>Selecciona tu ubicación</h3>
            <div className='editUbicacion_form'>
                <input type='checkbox' defaultChecked onChange={event => setDisabled(event.target.checked)}/>
                <span> Usar ubicación actual</span>
                <input onKeyPress={(event) => {if(event.key === "Enter")return getCords()}} disabled={disabled} type='text' placeholder='ubicación personalizada' style={{width: '200px'}} value = {state} onChange={event => setState(event.target.value)}/>
            <Boton colorBtn='btn_azul' style={{width: '100px'}} onClick={getCords}>elegir</Boton>
            </div>
            <div className='editUbicacion_map'>
                <Mapa position={position}/>
            </div>
            <Boton colorBtn='btn_azul' onClick={onSubmit}>Enviar</Boton>
        </div>
        </div>
        </div>
        </div>
    )
}