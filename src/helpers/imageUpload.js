import Swal from "sweetalert2";

import { CLOUDINARY_URL } from "../enviroment";

export const fileUpload = async (file) => {
  const cloudUrl = CLOUDINARY_URL;
  const formData = new FormData();
  formData.append("upload_preset", "work-app");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (resp.ok) {
      const cloudResp = await resp.json();
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};

export const startUploading = async (file) => {
  /*   Swal.fire({
    title: "Uploading...",
    text: "Please wait...", 
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  }); */

  if (file) {
    console.log("Entre al uploadImage");
    try {
      const fileUrl = await fileUpload(file);
      Swal.close();
      return fileUrl;
    } catch (e) {
      alert(e);
      Swal.fire(
        "Oops...!",
        "An error occurred while uploading the image",
        "error"
      );
    }
  }
};
