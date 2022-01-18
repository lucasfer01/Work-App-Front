import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";
import PostDetail from "../components/PostDetail/PostDetail";
import FormEmpleador from "../components/FormEmpleador/FormEmpleador";
import Sidebar from "../components/nav/Sidebar";
import Checkout from "../components/mercadopago/Mercadopago";
import { EditProfile } from "../components/ProfileDetails/EditProfile/EditProfile";
import { UploadImageTest } from "../components/uploadImageTest/UploadImageTest";
import { FormJobs } from "../components/formJobs/FormJobs"
import Messenger from "../components/Messenger/Messenger";

export const LoginRouter = () => {
  return (
    <div>
      <div>
        <Sidebar />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="jobs" element={<Home type="jobs" />} />
          <Route path="profile/:userId" element={<ProfileDetails />} />
          <Route path="editprofile/:userId" element={<EditProfile />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="createpost" element={<FormEmpleador />} />

          <Route path="prueba" element={<Checkout />} />
          <Route path="test" element={<UploadImageTest />} />
          <Route path="addjob" element={<FormJobs/>} />
          <Route path="messenger" element={<Messenger/>} />

          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
