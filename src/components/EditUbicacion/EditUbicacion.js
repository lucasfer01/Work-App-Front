import React from "react";
import Mapa from "../Mapa/Mapa";
import './EditUbicacion.css'
import Boton from '../Boton/Boton'
import Geocode from 'react-geocode'

// Renderizar este componente como un pop up, no como una ruta

export default function EditUbicacion(){

    const [state, setState] = React.useState(''); 
    const [position, setPosition] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)
 
    Geocode.setLanguage("es");
    Geocode.setApiKey("AIzaSyAf33rszL-PaMcLx9peQiwUgdDFwJiBxLc");

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

    function onSubmit(){
        // poner aquí la funcionalidad redux para hacer edit del perfil
        // de usuario y poder poner esa dirección en la base de datos
        // se debe enviar el estado "position" que tiene dos propiedades, lat y lng. 
        console.log("funciona")
    }

    return (
        <div className='editUbicacion_main'>
            <h3>Selecciona tu ubicación</h3>
            <div className='editUbicacion_form'>
                <input type='checkbox' defaultChecked onChange={event => setDisabled(event.target.checked)}/>
                <span> Usar ubicación actual</span>
                <input onKeyPress={(event) => {if(event.key === "Enter")return getCords()}} disabled={disabled} type='text' placeholder='ubicación personalizada' style={{width: '200px'}} value = {state} onChange={event => setState(event.target.value)}/>
            <Boton colorBtn='btn_azul' style={{width: '50px'}} onClick={getCords}>elegir</Boton>
            </div>
            <div className='editUbicacion_map'>
                <Mapa position={position}/>
            </div>
            <Boton colorBtn='btn_azul' onClick={onSubmit}>Enviar</Boton>
        </div>
    )
}