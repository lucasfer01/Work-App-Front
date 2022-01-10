import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { FaUsers } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import { BsPersonBoundingBox } from "react-icons/bs";
export const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
      title: 'Trabajos',
      path: '/jobs',
      icon: <BsBriefcaseFill />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: 'Perfil',
        path: '/perfil',
        icon: <BsPersonBoundingBox />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
      },
    {
      title: 'Nosotros',
      path: '/about',
      icon: <FaUsers />,
    }
  ];