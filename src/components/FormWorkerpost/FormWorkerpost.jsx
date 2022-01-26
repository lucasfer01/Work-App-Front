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

    return <form onSubmit={handleOnSubmit}>
        <label>Titulo</label>
        <input type="text" name='wp_title' value={workerpost.wp_title} onChange={handleOnChange} />

        <label>Descripcion</label>
        <textarea style={{ resize: 'none' }} name="wp_description" value={workerpost.wp_description} onChange={handleOnChange}></textarea>

        <label>Fotos</label>
        <input type="file" onChange={handleAddPhoto} />
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

        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
            <button onClick={() => setLoader(true)} type='submit'>Crear Workerpost</button>
            {loader && <img src={spinner} width='16px' alt='loader'/>}
        </div>
    </form>;
}