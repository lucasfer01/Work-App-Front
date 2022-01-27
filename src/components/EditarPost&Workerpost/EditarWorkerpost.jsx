// React
import React, { useEffect, useState } from 'react';
// Axios
import axios from 'axios';
// Url
import { WORKERPOST_URL } from '../../enviroment';
// React-router-dom
import { useParams, useNavigate } from 'react-router-dom';
// Subir imagen
import { startUploading } from '../../helpers/imageUpload';
// React-redux
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { finishLoading, startLoading } from '../../actions/ui';
// loading screen
import { LoadingScreen } from '../loadingScreen/LoadingScreen';
// Spinner
import spinnerGif from './assets/loading-buffering.gif';
// Estilos
import formStyle from './workerpost.module.css';


export function EditarWorkerpost() {
    // UseParams
    const { workerpostId } = useParams();

    // UseSeletor
    const sessionUserId = useSelector(state => state.auth.uid);
    const loader = useSelector(state => state.ui.loading);

    // useDispatch
    const dispatch = useDispatch();

    // Estado workerpost
    const [workerpostState, setWorkerpostState] = useState({
        wp_title: '',
        wp_description: '',
        wp_photo: []
    });
    // Esatdo loader
    const [uploading, setUploading] = useState(false);
    // Spinner
    const [spinner, setSpinner] = useState(false);

    // UseEffect
    useEffect(() => {
        // seteamos el loader en true
        dispatch(startLoading());

        // Hacemos peticion de workerpos
        axios.get(`${WORKERPOST_URL}/${workerpostId}`)
            .then(workerpost => setWorkerpostState({
                ...workerpostState,
                wp_title: workerpost.data.wp_title,
                wp_description: workerpost.data.wp_description,
                wp_photo: workerpost.data.wp_photo ? workerpost.data.wp_photo : []
            }))
            .catch(error => console.log(error))
            .finally(() => dispatch(finishLoading()));
    }, []);

    // UseNavigate
    const navigate = useNavigate();

    // HandleOnChange
    function handleOnChange(e) {
        // Seteamos el nuevo estado
        setWorkerpostState({
            ...workerpostState,
            [e.target.name]: e.target.value
        })
    }

    // HandleAddPhoto
    function handleAddPhoto(e) {
        // Seteamos el loader en true
        setUploading(true);

        // Subimos el archivo
        e.target.files[0] ? startUploading(e.target.files[0])
            .then(photoUrl => {
                setWorkerpostState({
                    ...workerpostState,
                    wp_photo: [...workerpostState.wp_photo, photoUrl]
                });
            })
            .catch(error => console.log(error))
            .finally(() => setUploading(false)) : setUploading(false);
    }

    // handleOnSubmit
    function handleOnSubmit(e) {
        // Prevenimos envio de formulario por defecto
        e.preventDefault();

        // Actualizamos el post
        axios.put(`${WORKERPOST_URL}/${workerpostId}`, workerpostState)
            .then(response => navigate(`/profile/${sessionUserId}`))
            .catch(error => console.log(error));
    }

    return loader ? <LoadingScreen /> : <div className={formStyle.contenedor}>
        <form className={formStyle.form} onSubmit={handleOnSubmit}>
            <div className={formStyle.contenedorSection}>
                <label className={formStyle.label}>Titulo</label>
                <input type="text" name='wp_title' value={workerpostState.wp_title} onChange={handleOnChange} />
            </div>

            <div className={formStyle.contenedorSection}>
                <label className={formStyle.label}>Descripcion</label>
                <textarea name="wp_description" style={{ resize: 'none' }} value={workerpostState.wp_description} onChange={handleOnChange}></textarea>
            </div>

            <div className={formStyle.contenedorSection}>
                <label className={formStyle.label}>Fotos</label>
                {workerpostState.wp_photo.length ? workerpostState.wp_photo.map(foto => <div key={foto}>
                    <img src={foto} alt='Foto Workerpost' width='250px' />
                    <button onClick={() => {
                        // Array de fotos temporal
                        const tempFotos = workerpostState.wp_photo;

                        // Borramos la foto del array
                        tempFotos.splice(tempFotos.indexOf(foto, 1));

                        // Seteamos el nuevo estado
                        setWorkerpostState({
                            ...workerpostState,
                            wp_photo: tempFotos
                        })
                    }}>X</button>
                </div>) : ''}
                <input type="file" onChange={handleAddPhoto} />
                {uploading && <h3>Cargando Archivo...</h3>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <button className={formStyle.button} onClick={() => setSpinner(true)} type='submit'>Actualizar Workepost</button>
                {spinner && <img src={spinnerGif} alt='spinner' width='16px' />}
            </div>
        </form>
    </div>
}