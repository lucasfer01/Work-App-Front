import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startUploading } from "../../actions/uploadImage";

export const UploadImageTest = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) setFile(newFile);
    e.target.value = null;
  };

  const postChanges = () => {
    if (file) {
      dispatch(startUploading(file));
      console.log("Entre aqwi");
    }
    setFile(null);
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
