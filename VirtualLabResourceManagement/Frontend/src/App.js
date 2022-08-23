import './App.css';
import React from "react";
//import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
import {BasicForm} from './BasicForm';
import { Route ,Routes} from 'react-router-dom';
import AdminRoute from './AdminRoute';
// import './components/OverallView.css';
// import Sidebar from './components/Sidebar';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// //import { AboutUs} from "./components/pages/AboutUs";
// import {
//   Labs,
//   LabOne,
//   LabTwo,
//   LabThree
// } from "./components/pages/Labs";
// import { Events, EventsOne, EventsTwo } from "./components/pages/Events";
// import Contact from "./components/pages/ContactUs";
// import Support from "./components/pages/Support";
// //import Navbar from './components/Navbar';
// //import OverallView from './components/pages/OverallView';
// //import MainRoute from './MainRoute'


function App() {

  
  return (
    <>
     {/* <BasicForm/> */}
     <AdminRoute/>
    </>
  );
}

export default App;
