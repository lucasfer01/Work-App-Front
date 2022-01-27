import { EvStationOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { editProfile, profileUser } from "../../../actions/profileActions";
import { startUploading } from "../../../helpers/imageUpload";
import Boton from "../../Boton/Boton";
import { countries } from "./countries";
import "./editProfile.css";


export function EditProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  let user = useSelector((state) => state.profile.user);
  console.log(user);
  const [saved, setSaved] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileUser(userId));
  }, []);

  const [updatedUser, setUpdatedUser] = useState({
    usr_username: user.usr_username,
    usr_photo: user.usr_photo,
    usr_description: user.usr_description,
    usr_charge: user.usr_charge,
    usr_gender: user.usr_gender,
    usr_country: user.usr_country,
    usr_social: user.usr_social,
    usr_phone: user.usr_phone,
    usr_banner: user.usr_banner
  });
  console.log(updatedUser);

  function onInputChange(e) {
    e.preventDefault();
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  }

  function onSocialChange(e) {
    e.preventDefault();
    setUpdatedUser({
      ...updatedUser,
      usr_social: {
        ...updatedUser.usr_social,
        [e.target.name]: e.target.value,
      },
    });
    setSaved(false);
  }

  const [file, setFile] = React.useState("");
  const [banner, setBanner] = React.useState("");

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log("file", file);
  };

  const handleChangeBanner = (e) => {
    const banner = e.target.files[0];
    setBanner(banner);
    console.log("banner", banner);
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();

    const urlFoto = await startUploading(file);
    console.log(urlFoto);
    setUpdatedUser({
      ...updatedUser,
      usr_photo: [urlFoto],
    });
    setFile("");
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();

    const urlBanner = await startUploading(banner);
    console.log(urlBanner);
    setUpdatedUser({
      ...updatedUser,
      usr_banner: [urlBanner],
    });
    setBanner("");
  };

  const handleDeletePhoto = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log("photo:", value);
    setUpdatedUser({
      ...updatedUser,
      usr_photo: updatedUser.usr_photo.filter((p) => p !== value),
    });
  };

  const handleDeleteBanner = (e) => {
    e.preventDefault();
    const { value } = e.target;
    console.log("banner:", value);
    setUpdatedUser({
      ...updatedUser,
      usr_banner: updatedUser.usr_banner.filter((p) => p !== value),
    });
  };

  function onSubmit(e) {
    setSaved(true);
    const edit = async () => {
      e.preventDefault();
      await dispatch(editProfile(userId, updatedUser));
    };
    edit();
    // window.location.href = `/profile/${userId}`
  }

  const savedMsg = () => {
    if (saved === true) {
      return "Perfil actualizado correctamente";
    } else return " ";
  };

  return (
    <div>
      <form className="form-register">
        <div>
          <h2>Editar Perfil</h2>
        </div>
        <div>
          <label>Username</label>
          <input
            className="controls"
            name="usr_username"
            type="text"
            value={updatedUser.usr_username ? updatedUser.usr_username : ""}
            onChange={onInputChange}
          />
        </div>
        <div className="formEmpleado_foto">
          <label>Foto de perfil</label>
          <input className="controls" type="file" onChange={handleChangePhoto} />
          <Boton colorBtn="btn_azul" onClick={handleAddPhoto}>
            Añadir
          </Boton>
          <div className="formEmpleado_fotos">
            {updatedUser.usr_photo?.length > 0 &&
              updatedUser.usr_photo.map((photo, i) => {
                return (
                  <div key={i} className="boxfoto">
                    <input className="controls" type="image" src={photo} alt="img not found" />
                    <button value={photo} onClick={handleDeletePhoto}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="formEmpleado_foto">
          <label>Portada</label>
          <input className="controls" type="file" onChange={handleChangeBanner} />
          <Boton colorBtn="btn_azul" onClick={handleAddBanner}>
            Añadir
          </Boton>
          <div className="formEmpleado_fotos">
            {updatedUser.usr_banner?.length > 0 &&
              updatedUser.usr_banner?.map((banner, i) => {
                return (
                  <div key={i} className="boxfoto">
                    <input className="controls" type="image" src={banner} alt="img not found" />
                    <button value={banner} onClick={handleDeleteBanner}>
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <label>Descripción</label>
          <input
            className="controls"
            name="usr_description"
            type="text"
            value={
              updatedUser.usr_description ? updatedUser.usr_description : ""
            }
            onChange={onInputChange}
          />
        </div>
        <div>
          <label>Cargo</label>
          <input
            className="controls"
            name="usr_charge"
            type="text"
            value={updatedUser.usr_charge ? updatedUser.usr_charge : ""}
            onChange={onInputChange}
          />
        </div>
        <div className="divs">
          <label>Sexo</label>
          <select className="selecx" name="usr_gender" id="usr_gender" value = {updatedUser.usr_gender} onChange={onInputChange}>
            <option value=" --- " selected></option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="divs">
          <label>Pais</label>
          <select className="selecx" name="usr_country" id="usr_country" value = {updatedUser.usr_country} onChange={onInputChange}>
            <option value=" --- " selected></option>
            {countries.map((c) => {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Telefono</label>
          <input
            className="controls"
            name="usr_phone"
            type="tel"
            id="phone"
            pattern="+[0-9]{2-3} [0-9]{2-3} [0-9]{6-10}"
            value={updatedUser.usr_phone ? updatedUser.usr_phone : ""}
            onChange={onInputChange}
          />
          <label className="labels">Ej: +54 287 4565487</label>
        </div>
        <label className="labels">Redes Sociales</label>
        <div>
          <label>Facebook</label>
          <input
            className="controls"
            name="facebook"
            type="text"
            value={
              updatedUser.usr_social?.facebook
                ? updatedUser.usr_social.facebook
                : ""
            }
            onChange={onSocialChange}
          />
        </div>
        <div>
          <label>Instagram</label>
          <input
            className="controls"
            name="instagram"
            type="text"
            value={
              updatedUser.usr_social?.instagram
                ? updatedUser.usr_social.instagram
                : ""
            }
            onChange={onSocialChange}
          />
        </div>
        <div>
          <label>LinkedIn</label>
          <input
          className="controls"
            name="linkedin"
            type="text"
            value={
              updatedUser.usr_social?.linkedin
                ? updatedUser.usr_social.linkedin
                : ""
            }
            onChange={onSocialChange}
          />
        </div>
        <div>
          <label>Github</label>
          <input
          className="controls"
            name="github"
            type="text"
            value={
              updatedUser.usr_social?.github
                ? updatedUser.usr_social.github
                : ""
            }
            onChange={onSocialChange}
          />
        </div>
        {/* <div>
          <label>Ubicación</label>
          <input name="usr_location" type="text" onChange={onInputChange} />
        </div> */}
        <button onClick={onSubmit}>
          Guardar
        </button>
        <p>{savedMsg()}</p>
        <Link to={`/profile/${userId}`}>
        <button>Volver al perfil</button>
      </Link>
      </form>
    </div>
  );
}
