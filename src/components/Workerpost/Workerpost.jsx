// React
import React, { useEffect, useState } from 'react';
// React-Icons
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai'
// React-Redux
import { useSelector, useDispatch } from 'react-redux';
// React-router-dom
import { useNavigate } from 'react-router-dom';
// Actions
import { finishLoading, startLoading } from '../../actions/ui';
// Estilos
import workerpostStyle from '../NewNav/Post/Post.module.css';
// Axios
import axios from 'axios';
import { FRONT_URL, WORKERPOST_URL } from '../../enviroment';

export function Workerpost({ workerposts }) {
    // CanEditOrDelete
    const [canEditOrDelete, setCanEditOrDelete] = useState(false);

    // UseSelector
    const sessionUserId = useSelector(state => state.auth.uid);

    // UseDispatch
    const dispatch = useDispatch();

    // UseEffect
    useEffect(() => {
        // Verificamos si la ruta empieza con profile
        if (window.location.pathname.slice(9) === sessionUserId) {
            setCanEditOrDelete(true);
        }
    }, []);

    // useNavigate
    const navigate = useNavigate();

    // handlerButtonEdit
    function handlerButtonEdit(workerpostId) {
        // Direccionamos a el componente para ediatr el workerpost
        navigate(`/editWorkerpost/${workerpostId}`);
    }

    // handlerButtonDelete
    function handlerButtonDelete(workerpostId) {
        // Hacemos dispatch a la pantalla de carga
        dispatch(startLoading());

        // Hacemos llamada para eliminar el workerpost
        axios.delete(`${WORKERPOST_URL}/${workerpostId}`)
            .then(response => {
                dispatch(finishLoading());
                window.location.href = `${FRONT_URL}/profile/${sessionUserId}`
            })
            .catch(error => console.log(error));
    }

    return <div className={workerpostStyle.container}>
        {workerposts.length ?
            workerposts.map(workerpost => <div style={{position:'relative', display:'flex', justifyContent:'center', alignItems:'center', border: '1px solid black', flexDirection:'column', marginBottom:'2rem'}} key={workerpost.wp_id}>
                <img src={workerpost.wp_photo && workerpost.wp_photo[0]} width='500px' alt="foto workerpost" />
                <h1>{workerpost.wp_title}</h1>
                <h2>{workerpost.wp_description}</h2>

                {canEditOrDelete && <button onClick={() => handlerButtonEdit(workerpost.wp_id)} className={workerpostStyle.buttonEdit}>
                    <AiOutlineEdit fill="#fff" style={{ fontSize: '1.1rem' }} />
                </button>}

                {canEditOrDelete && <button id={workerpost.wp_id} onClick={() => handlerButtonDelete(workerpost.wp_id)} className={workerpostStyle.buttonDelete}>
                    <AiFillDelete fill="#fff" style={{ fontSize: '1.1rem' }} />
                </button>}
            </div>) : 'No existen workerposts'}
    </div>;
}