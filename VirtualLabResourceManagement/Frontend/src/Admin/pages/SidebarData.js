import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { SiGoogleclassroom } from 'react-icons/si';
  
export const SidebarData = [
  {
    title: "Overall view",
    path: "/admin/home",
    icon: <AiIcons.AiFillHome />,
  },

  {
    title: "View Labs",
    path: "/Labs/View",
    icon: <RiIcons.RiComputerFill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Add Lab",
    path: "/Labs/Add",
    icon: <SiGoogleclassroom />,
    cName: "sub-nav"
  },
  {
    title: "Bill details",
    path: "/admin/image/view",
    icon: <RiIcons.RiComputerFill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
    // subNav: [
    //   {
    //     title: "View",
    //     path: "/Labs/View",
    //     icon: <SiGoogleclassroom />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Add Lab",
    //     path: "/Labs/Add",
    //     icon: <SiGoogleclassroom />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Edit Lab",
    //     path: "/Labs/Edit",
    //     icon: <SiGoogleclassroom />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "Remove Lab",
    //     path: "/Labs/Remove",
    //     icon: <SiGoogleclassroom />,
    //     cName: "sub-nav",
    //   },

      // {
      //   title: "Lab 1",
      //   path: "/Labs/Lab1",
      //   icon: <SiGoogleclassroom />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Lab 2",
      //   path: "/Labs/Lab2",
      //   icon: <SiGoogleclassroom />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "Lab 3",
      //   path: "/Labs/Lab3",
      //   icon: <SiGoogleclassroom />,
      // },
      // {
      //   title: "Lab 4",
      //   path: "/Labs/Lab4",
      //   icon: <SiGoogleclassroom />,
      // },
      // {
      //   title: "Lab 5",
      //   path: "/Labs/Lab5",
      //   icon: <SiGoogleclassroom />,
      // },
      // {
      //   title: "Lab 6",
      //   path: "/Labs/Lab6",
      //   icon: <SiGoogleclassroom />,
      // },
    // ],
    // },
  {
    title: "Problem Page",
    path: "/problempage",
    icon: <RiIcons.RiErrorWarningFill/>,
  },
  {
    title: "Instructions",
    path: "/admin/instructions",
    icon: <FaIcons.FaEnvelopeOpenText />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "About us",
    path: "/admin/aboutus",
    icon: <IoIcons.IoMdHelpCircle />,
  }
];