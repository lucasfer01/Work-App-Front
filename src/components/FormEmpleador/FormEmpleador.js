import React from "react";
import './FormEmpleador.css'
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
// form Empleados action
import { postPost } from '../../actions/formEmpleador';

export default function FormEmpleador() {
    const navigate = useNavigate();
    const [post, setPost] = React.useState({
        post_description: "",
        post_shortDescription: "",
        post_photo: [],
        post_title: '',
        post_type: "contratar",
    });
    const [file, setFile] = React.useState("");

    async function handleOnSubmit(e) {
        e.preventDefault();

        try {
            const createPost = await postPost({
                ...post
            });
           window.location.reload(true)

            return createPost;

        } catch (e) {
            alert(e);
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
        <div
        className="modal fade"
        id="FormEmpleador"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="FormEmpleadorLabel"
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
                <form onSubmit={handleOnSubmit} >
                    <div className='formEmpleado_title'>
                        <p>Postea el trabajo que necesitas</p>
                    </div>
                    <div className='formEmpleado_type'>
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
        </div>
        </div>
        </div>
    )
}