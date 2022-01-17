import React, { useState } from "react";
import { startUploading } from "../../helpers/imageUpload";

export const UploadImageTest = () => {
  const [file, setFile] = useState(null);

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) setFile(newFile);
    e.target.value = null;
  };

  /* La funcion encargada de regresar la url de la imagen es: ---> "startUploading" <----, 
  todo lo demas es solo una representacion para guiarme en el proceso */

  //Poner async await para que regrese el url en lugar de una promesa
  const postChanges = async () => {
    //se le pasa por parametro el archivo que viene de e.target.files[0];
    const urlFile = await startUploading(file);
    //Todo tu codigo aqui...
  };

  return (
    <div className="container-fluid">
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handlePictureClick}>
          Picture <i className="fas fa-images"></i>
        </button>
        <button className="btn btn-success ml-4" onClick={postChanges}>
          Postear <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};
