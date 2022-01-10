import React from "react";
import './FormEmpleador.css'
import Boton from '../Boton/Boton'
// form Empleados action
import { postPost } from '../../actions/formEmpleador';

export default function FormEmpleador(){
    const [post, setPost] = React.useState({
        post_description: "",
        post_photo: '',
        post_title: 'titulo de prueba'
    });
    
    async function handleOnSubmit(e) {
        e.preventDefault();

        try {
            const createPost = await postPost({
                ...post
            });

            return createPost;

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <form onSubmit={handleOnSubmit} className='formEmpleado_main'>
            <div className='formEmpleado_title'>
                <p>Postea el trabajo que necesitas</p>
            </div>
            <div className='formEmpleado_description'>
                <p>Añade una descripción: </p>
                <textarea cols='50' value={post.post_description} onChange={(event)=>setPost({...post, post_description: event.target.value})}></textarea>
            </div>
            <div className='formEmpleado_foto'>
                <p>Sube una foto: </p>
                <input type='text' onChange={event=> setPost({...post, post_photo: event.target.value})}/>
            </div>
            <div className='formEmpleado_boton'>
                <div><Boton colorBtn={'btn_azul'}> Postear</Boton></div>
            </div>
        </form>
    )
}