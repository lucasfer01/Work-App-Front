import React from "react";
import { useDispatch } from "react-redux";
import { startUploading } from "../../actions/uploadImage";

export const UploadImageTest = () => {
  const dispatch = useDispatch();

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
    e.target.value = null;
  };

  return (
    <div>
      <input
        id="fileSelector"
        type="file"
        name="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn btn-primary" onClick={handlePictureClick}>
          Picture
        </button>
      </div>
    </div>
  );
};
