import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { editProfile, profileUser } from "../../../actions/profileActions";

export function EditProfile() {
    const {userId} = useParams()
  let user= useSelector((state) => state.profile.user)
  console.log(user)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId))
  }, []);
   

  const [updatedUser, setUpdatedUser] = useState({
    usr_username: user.usr_username,
    // usr_photo: user.usr_photo[0],
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

function onSubmit(){
    dispatch(editProfile(userId, updatedUser))
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
        {/* <div>
          <label>Photo</label>
          <input name="usr_photo" type="file"  onChange={onInputChange} />
        </div> */}
        <div>
          <label>Descripción</label>
          <input name="usr_description" type="text" value={updatedUser.usr_description} onChange={onInputChange} />
        </div>
        {/* <div>
          <label>Ubicación</label>
          <input name="usr_location" type="text" onChange={onInputChange} />
        </div> */}
        <Link to={`/profile/${userId}`}>
        <button onClick={onSubmit}>Guardar</button>
        </Link>
      </form>
    </div>
  );
}
