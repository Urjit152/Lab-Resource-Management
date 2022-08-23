import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { SiGoogleclassroom } from 'react-icons/si';
  
export const SidebarData = [
  {
    title: "OverallView",
    path: "/labincharge/home",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Labs",
    path: "/labincharge/Labs",
    icon: <RiIcons.RiComputerFill/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  
    // subNav: [
    //   {
    //     title: "Lab 1",
    //     path: "/Labs/Lab1",
    //     icon: <SiGoogleclassroom />,
    //     cName: "sub-nav",
    //   },
    // ],
  },

  {
    title: "Problem Page",
    path: "/labincharge/ProblemPage",
    icon: <RiIcons.RiErrorWarningFill/>,
  },
  {
    title: "Instructions",
    path: "/labincharge/instructions",
    icon: <FaIcons.FaEnvelopeOpenText />,
  
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "AboutUs",
    path: "/labincharge/aboutUs",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];