import React from "react";
import './FormEmpleador.css'
import Boton from '../Boton/Boton';
import { useNavigate } from 'react-router-dom';
// form Empleados action
import { postPost } from '../../actions/formEmpleador';
import { sendNotification } from "../../controllers";
import { startUploading } from "../../helpers/imageUpload";
import { useSelector } from "react-redux";

export default function FormEmpleador() {
  let { uid }= useSelector((state) => state.auth)

    const navigate = useNavigate();
    const [post, setPost] = React.useState({
        post_description: "",
        post_shortDescription: "",
        post_photo: [],
        post_title: '',
        post_type: "contratar",
        post_priority: "Urgente",
        usr_id: uid
    });
    const [file, setFile] = React.useState("");

    console.log("postForm", post)

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
        const file = e.target.files[0];
        setFile(file);
    }

    const handleAddPhoto = async (e) => {
        e.preventDefault();

        const urlFoto = await startUploading(file); 

        setPost({
            ...post,
            post_photo: [...post.post_photo, urlFoto]
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
                    <div className='formEmpleado_prioridad'>
                        <p>Selecciones la prioridad</p>
                        <select onChange={(event)=>setPost({...post, post_priority: event.target.value})}>
                            <option value='Urgente'>Urgente</option>
                            <option value='Poco Urgente'>Poco Urgente</option>
                            <option value='Sin Urgencia'>Sin Urgencia</option>
                        </select>
                    </div>
                    <div className='formEmpleado_foto'>
                        <p>Sube una o más fotos: </p>
                        <input type='file' onChange={handleChangePhoto} />
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