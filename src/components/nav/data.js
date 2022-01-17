import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";


export const SidebarData = () => {

  const { uid }= useSelector((state) => state.auth)
  
  return [
    {
      title: 'Busca Trabajo',
      path: '/home',
      icon: <AiIcons.AiFillHome />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
      title: 'Busca Trabajador',
      path: '/jobs',
      icon: <BsBriefcaseFill />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: 'Perfil',
        path: ('/profile/' + uid),
        icon: <BsPersonBoundingBox />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
      },
    {
      title: 'Nosotros',
      path: '/about',
      icon: <FaUsers />,
    },
    {
      title: 'Cerrar Sesion',
      icon: <FaPowerOff />,
      path: ""
    },
  ];
}