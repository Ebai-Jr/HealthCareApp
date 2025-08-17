import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Register',
    path: '/register',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoIosLogIn />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillDatabase />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <AiIcons.AiFillBook />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <IoIcons.IoIosClock />,
    cName: 'nav-text'
  },
  {
    title: 'MapView',
    path: '/mapview',
    icon: <IoIcons.IoIosMap />,
    cName: 'nav-text'
  },
]