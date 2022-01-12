import React from "react";
import './FormEmpleador.css'
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
// form Empleados action
import { postPost } from '../../actions/formEmpleador';
import { sendNotification } from "../../controllers";

export default function FormEmpleador() {
    const navigate = useNavigate();
    const [post, setPost] = React.useState({
        post_description: "",
        post_shortDescription: "",
        post_photo: [],
        post_title: '',
        post_type: "",
    });
    const [file, setFile] = React.useState("");

    async function handleOnSubmit(e) {
        e.preventDefault();

        try {
            const createPost = await postPost({
                ...post
            });
            sendNotification({
                title: "Nuevo post",
                message: post.post_title,
            })
            navigate("/profile");

            return createPost;

        } catch (e) {
            console.log(e);
        }
    }

    const handleChangePhoto = (e) => {
        const { value } = e.target;
        setFile(value);
    }

    const handleAddPhoto = (e) => {
        e.preventDefault();
        setPost({
            ...post,
            post_photo: [...post.post_photo, file]
        })
        setFile("");
    }

    const handleDeletePhoto = (e) => {
        e.preventDefault();
        const { value } = e.target;
        console.log("photo:", value);
        setPost({
            ...post,
            post_photo: post.post_photo.filter(p => p !== value)
        })
    }


    return (
        <form onSubmit={handleOnSubmit} className='formEmpleado_main'>
            <div className='formEmpleado_title'>
                <p>Postea el trabajo que necesitas</p>
            </div>
            <div className='formEmpleado_type'>
                    <p>¿Buscas un servicio u ofreces uno?</p>
                <div className="item">
                    <input type="radio" name="type" id="hire" value="contratar" onChange={event => setPost({ ...post, post_type: event.target.value })} />
                    <label for="hire">Requiero de un servicio</label>
                </div>
                <div className="item">
                    <input type="radio" name="type" id="offer" value="ofrecer" onChange={event => setPost({ ...post, post_type: event.target.value })} />
                    <label for="html">Ofrezco mis servicios</label>
                </div>
            </div>
            <div className='formEmpleado_foto'>
                <p>Título del post: </p>
                <input type='text' onChange={event => setPost({ ...post, post_title: event.target.value })} />
            </div>
            <div className='formEmpleado_foto'>
                <p>Resumen: </p>
                <input type='text' onChange={event => setPost({ ...post, post_shortDescription: event.target.value })} />
            </div>
            <div className='formEmpleado_description'>
                <p>Añade una descripción detallada: </p>
                <textarea cols='50' value={post.post_description} onChange={(event) => setPost({ ...post, post_description: event.target.value })}></textarea>
            </div>
            <div className='formEmpleado_foto'>
                <p>Sube una o más fotos: </p>
                <input type='text' value={file} onChange={handleChangePhoto} />
                <button onClick={handleAddPhoto}>Añadir</button>
                <div className="formEmpleado_fotos">|
                    {
                        post.post_photo.length > 0 && post.post_photo.map((photo, i) => {
                            return (
                                <div key={i} className="boxfoto">
                                    <input type="image" src={photo} alt="img not found" />
                                    <button value={photo} onClick={handleDeletePhoto}>X</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='formEmpleado_boton'>
                <div><Boton colorBtn={'btn_azul'}> Postear</Boton></div>
            </div>
        </form>
    )
}