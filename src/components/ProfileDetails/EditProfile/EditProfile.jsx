import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editProfile, profileUser } from "../../../actions/profileActions";
import { startUploading } from "../../../helpers/imageUpload";


export function EditProfile() {
  const navigate = useNavigate();
    const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)
  console.log(user)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, []);
   

  const [updatedUser, setUpdatedUser] = useState({
    usr_username: user.usr_username,
    usr_photo: user.usr_photo,
    usr_description: user.usr_description,
    // usr_location: user.usr_location
  });
  console.log(updatedUser)

function onInputChange(e) {
    e.preventDefault()
    setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value
    })

}

const [file, setFile] = React.useState("");

const handleChangePhoto = (e) => {
  const file = e.target.files[0];
  setFile(file);
  console.log("file", file)
}

const handleAddPhoto = async (e) => {
  e.preventDefault();

  const urlFoto = await startUploading(file); 
  console.log(urlFoto)
  setUpdatedUser({
      ...updatedUser,
      usr_photo: [urlFoto]
  })
  setFile("");
}

const handleDeletePhoto = (e) => {
  e.preventDefault();
  const { value } = e.target;
  console.log("photo:", value);
  setUpdatedUser({
      ...updatedUser,
      usr_photo: updatedUser.usr_photo.filter(p => p !== value)
  })
}

function onSubmit(e){
  const edit = async () => {
    e.preventDefault()
    await dispatch(editProfile(userId, updatedUser))
  }
  edit();
  // window.location.href = `/profile/${userId}`
}

  return (
    <div>
      <form>
        <div>
          <h2>Editar Perfil</h2>
        </div>
        <div>
          <label>Username</label>
          <input name="usr_username" type="text" value={updatedUser.usr_username} onChange={onInputChange} />
        </div>
        <div className='formEmpleado_foto'>
                        <label>Foto de perfil</label>
                        <input type='file' onChange={handleChangePhoto} />
                        <button onClick={handleAddPhoto}>Añadir</button>
                        <div className="formEmpleado_fotos">|
                            {
                                updatedUser.usr_photo?.length > 0 && updatedUser.usr_photo.map((photo, i) => {
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
        <div>
          <label>Descripción</label>
          <input name="usr_description" type="text" value={updatedUser.usr_description} onChange={onInputChange} />
        </div>

        {/* <div>
          <label>Ubicación</label>
          <input name="usr_location" type="text" onChange={onInputChange} />
        </div> */}
        <button type="submit" onClick={onSubmit}>Guardar</button>
      </form>
    </div>
  );
}
