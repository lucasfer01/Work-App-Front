import React from "react";
import './FormEmpleador.css'
import Boton from '../Boton/Boton'

export default function FormEmpleador(){
    const [post, setPost] = React.useState({
        descripcion: "",
        foto: null,
    })
    console.log(post)
    return (
        <div className='formEmpleado_main'>
            <div className='formEmpleado_title'>
                <p>Postea el trabajo que necesitas</p>
            </div>
            <div className='formEmpleado_description'>
                <p>Añade una descripción: </p>
                <textarea cols='50' value={post.descripcion} onChange={(event)=>setPost({...post, descripcion: event.target.value})}></textarea>
            </div>
            <div className='formEmpleado_foto'>
                <p>Sube una foto: </p>
                <input type='file' onChange={event=> setPost({...post, foto: event.target.files[0]})}/>
            </div>
            <div className='formEmpleado_boton'>
                <div><Boton colorBtn={'btn_azul'}> Postear</Boton></div>
            </div>
        </div>
    )
}