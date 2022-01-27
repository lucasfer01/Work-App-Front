// React
import React, { useEffect, useState } from 'react';
// React-router-dom
import { useParams } from 'react-router-dom';
// Axios
import axios from 'axios';
import { POST_URL, POST_FRONT_URL } from '../../enviroment';
import { startUploading } from '../../helpers/imageUpload';
import Boton from '../Boton/Boton';

export function EditarPost() {
  // Obtenemos Id de url
  const { postId } = useParams();

  // useState
  const [post, setPost] = useState({});
  const [uploading, setUploading] = useState(false);

  // useEffect
  useEffect(() => {
    // Requerimos le post
    axios.get(`${POST_URL}/${postId}`)
      .then(post => setPost(post.data))
      .catch(error => console.log(error));
  }, [])

  // handleOnChange
  function handleOnChange(e) {
    // Seteamos el estado con el valor del input
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }

  // handleAddPhoto
  function handleAddPhoto(e) {
    // Seteamos el estado de uploading a true
    setUploading(true)

    // Subimos el archivo
    e.target.files[0] ? startUploading(e.target.files[0])
      .then(photoUrl => {
        setPost({
          ...post,
          post_photo: [...post.post_photo, photoUrl]
        });
      })
      .catch(error => console.log(error))
      .finally(() => setUploading(false)) : setUploading(false);

  }

  // handleOnSubmit
  function handleOnSubmit(e) {
    // Prevenimos el enviado del formulario
    e.preventDefault();

    // Enviamos los nuevos datos del post
    axios.put(`${POST_URL}/${postId}`, {...post})
      .then(updatedPost => window.location.href = `${POST_FRONT_URL}/${postId}`)
      .catch(error => console.log(error));
  }

  return (
    <div className='editPost_main' style={{position: "relative", top: "90px", display: "grid", justifyContent: "center", alignItems: "center"}}>
    <form onSubmit={handleOnSubmit} style ={{borderRadius: "10px", padding: "20px", backgroundColor: "#24303C", color: "white"}}>
      <div>
        <label>Titulo</label>
        <input type="text" name='post_title' value={post.post_title} onChange={handleOnChange} />
      </div>
      <div>
        <label>Resumen</label>
        <input type="text" name='post_shortdescription' value={post.post_shortdescription} onChange={handleOnChange} />
      </div>
      <div>
        <label>Urgencia</label>
        <select value={post.post_priority} onChange={handleOnChange} name="post_priority">
          <option value="Urgente">Urgente</option>
          <option value="Poco Urgente">Poco Urgente</option>
          <option value="Sin Urgencia">Sin Urgencia</option>
        </select>
      </div>
      <div>
        <label>Fotos</label>
        {post.post_photo ? post.post_photo.map(foto =>
          <div key={foto}>
            <img src={foto} alt="foto post" width='300px' />
            <button onClick={() => {
              // temporal
              const temporalPhotos = post.post_photo;

              // Borramos la foto a partir de la ubicacion de la foto
              temporalPhotos.splice(temporalPhotos.indexOf(foto), 1);

              // Seteamos el nuevo estado
              setPost({
                ...post,
                post_photo: temporalPhotos
              })
            }}>X</button>
          </div>
          )
          : ''}
      </div>
      <div>
        <input type="file" onChange={handleAddPhoto} />
        {uploading && <h3>Cargando Archivo...</h3>}
      </div>

      <Boton colorBtn='btn_azulLine' type='submit'>Actualizar post</Boton>
    </form>
    </div>
    )
}