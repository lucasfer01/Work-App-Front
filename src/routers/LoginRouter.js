import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import { ProfileDetails } from "../components/ProfileDetails/ProfileDetails";
import PostDetail from "../components/PostDetail/PostDetail";
import FormEmpleador from "../components/FormEmpleador/FormEmpleador";
import Checkout from "../components/mercadopago/Mercadopago";
import { EditProfile } from "../components/ProfileDetails/EditProfile/EditProfile";

import AlertaEmpleo from "../components/AlertasEmpleo/AlertaEmpleo.jsx";
import { CardsProfileUser } from "../components/cardsProfileUser/CardsProfileUser";
import { About } from "../components/About/About";

import Messenger from "../components/Messenger/Messenger";
import NewNav from "../components/NewNav/NewNav";

import { FormReview } from "../components/formReview/FormReview";
import { FormNewJob } from "../components/formNewJob/FormNewJob";
import { RedirectPostpago } from "../components/mercadopago/RedirectPostpago";

import { Plan } from "../components/Plan/Plan";
import { EditarPost } from "../components/EditarPost&Workerpost/EditarPost";
import { FormWorkerpost } from "../components/FormWorkerpost/FormWorkerpost";
import {EditarWorkerpost} from '../components/EditarPost&Workerpost/EditarWorkerpost';


export const LoginRouter = () => {
  return (
    <div>
      <div>
        <NewNav />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="jobs" element={<Home />} />
          <Route path="profile/:userId/alert" element={<AlertaEmpleo />} />
          <Route path="profile/:userId" element={<ProfileDetails />} />
          <Route path="editprofile/:userId" element={<EditProfile />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="createpost" element={<FormEmpleador />} />
          <Route path="job/:jobId" element={<CardsProfileUser />} />
          <Route path="messenger" element={<Messenger />} />
          <Route path="upgradePlan" element={<Plan />} />
          <Route path="upgradePlan/checkPayment/*" element={<RedirectPostpago />} />
          <Route path="editPost/:postId" element={<EditarPost />} />
          <Route path="create-workerpost" element={<FormWorkerpost />} />
          <Route path="editWorkerpost/:workerpostId" element={<EditarWorkerpost/>} />

          <Route path="test" element={<FormReview />} />
          <Route path="test2" element={<FormNewJob />} />

          {/* {Todas las rutas privadas deben ir aquí} */}
        </Routes>
      </div>
    </div>
  );
};
