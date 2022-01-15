import Swal from "sweetalert2";

import { fileUpload } from "../helpers/imageUpload";

export const startUploading = (file) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const fileUrl = await fileUpload(file);
      dispatch(SavePost(fileUrl));
    } catch (e) {
      console.log(e);
    }
  };
};

export const SavePost = (imgUrl) => {
  return () => {
    try {
      console.log("saved in DB:" + imgUrl);
      Swal.fire("Success", "Your post was published successfully", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Oops...",
        "Something went wrong! Please try again later",
        "error"
      );
    }
  };
};
