import React from "react";
import { Routes, Route } from "react-router-dom";
import FormEmpleador from "../components/FormEmpleador/FormEmpleador";
import { HomeScreen } from "../components/home/HomeScreen";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";

export const LoginRouter = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="home" element={<HomeScreen />} />
          <Route path='profile' element={ <ProfileDetails/>}/>
          <Route path='form/empleador' element={ <FormEmpleador/>}/>
          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
