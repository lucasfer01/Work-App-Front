// React
import React, { useState } from 'react';
// Actions
import { startUploading } from '../../helpers/imageUpload';
// Axios
import axios from 'axios';
// Urls
import { WORKERPOST_URL } from '../../enviroment';
// React-redux
import { useSelector } from 'react-redux';
// React-router-dom
import { useNavigate } from 'react-router-dom';
// Loader gif
import spinner from './assets/loading-buffering.gif';
import Boton from '../Boton/Boton';
import Leftbar from "../NewNav/Leftbar/Leftbar"
import "./worker.css"

export function FormWorkerpost() {
    // workerpost
    const [workerpost, setWorkerpost] = useState({
        wp_title: "",
        wp_description: "",
        wp_photo: []
    });

    // uploading
    const [uploading, setUploading] = useState(false);

    // postdata loader
    const [loader, setLoader] = useState(false);

    // useSelector
    const sessionUserId = useSelector(state => state.auth.uid);

    // UseNavigate
    const navigate = useNavigate();

    // HandleOnChange
    function handleOnChange(e) {
        // Seteamos el nuevo estado
        setWorkerpost({
            ...workerpost,
            [e.target.name]: e.target.value
        })
    }

    // HandleAddPhoto
    function handleAddPhoto(e) {
        // Seteamos el estado de uploading a true
        setUploading(true)

        // Subimos el archivo
        e.target.files[0] ? startUploading(e.target.files[0])
            .then(photoUrl => {
                setWorkerpost({
                    ...workerpost,
                    wp_photo: [...workerpost.wp_photo, photoUrl]
                });
            })
            .catch(error => console.log(error))
            .finally(() => setUploading(false)) : setUploading(false);
    }

    // HandleOnSubmit
    function handleOnSubmit(e) {
        // prevenimos accion por defecto
        e.preventDefault();

        // Subimos el workerpost
        axios.post(WORKERPOST_URL, { ...workerpost, usr_id: sessionUserId, wp_photo: workerpost.wp_photo.length ? workerpost.wp_photo : ['https://www.argentina.gob.ar/sites/default/files/trabajar.jpg'] })
            .then(uploadedWorkerpost => navigate(`/profile/${sessionUserId}`))
            .catch(error => console.log(error));
    }

    return (
        <div>
            <div className='div-left'>
        <Leftbar />
        </div>
    <form className='form-register2' onSubmit={handleOnSubmit}>
        <div>
        <h2>Workerpost</h2>
        </div>
        <div>
        <label className='labels'>Titulo</label>
        <input className='controls2' type="text" name='wp_title' value={workerpost.wp_title} onChange={handleOnChange} />
        </div>
        <div>
        <label className='labels'>Descripcion</label>
        <input
            className="controls2"
            name="wp_description"
            type="text"
            value={workerpost.wp_description}
            onChange={handleOnChange}
          />
        </div>
        <div>
        <label className='labels'>Fotos</label>
        <input className='controls2' type="file" onChange={handleAddPhoto} />
        {uploading && <h3>Cargando Archivo...</h3>}

        {workerpost.wp_photo.length ? workerpost.wp_photo.map(foto => <div key={foto}>
            <img src={foto} alt="Foto workerpost" width='300px' />
            <button onClick={() => {
                // temporal
                const temporalPhotos = workerpost.wp_photo;

                // Borramos la foto a partir de la ubicacion de la foto
                temporalPhotos.splice(temporalPhotos.indexOf(foto), 1);

                // Seteamos el nuevo estado
                setWorkerpost({
                    ...workerpost,
                    wp_photo: temporalPhotos
                })
            }}>X</button>
        </div>) : ''}
        </div>

        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
            <Boton colorBtn="btn_azul" onClick={() => setLoader(true)} type='submit'>Crear Workerpost</Boton>
            {loader && <img src={spinner} width='16px' alt='loader'/>}
        </div>
    </form>
    </div>
    )
}