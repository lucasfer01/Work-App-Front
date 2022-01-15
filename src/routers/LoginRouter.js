import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";
import PostDetail from "../components/PostDetail/PostDetail";
import FormEmpleador from "../components/FormEmpleador/FormEmpleador";
import Sidebar from "../components/nav/Sidebar";
import Checkout from "../components/mercadopago/Mercadopago";
import { EditProfile } from "../components/ProfileDetails/EditProfile/EditProfile";
import {store} from '../store/store'
import { startLogout } from "../actions/auth"; 
import { CardProfileUser } from "../components/cardProfileUser/CardProfileUser";

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
          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
