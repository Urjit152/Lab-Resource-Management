import "./App.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
//import { BrowserRouter as Router,Routes, Route,Link } from "react-router-dom";
import { BasicForm } from "./BasicForm";
import "./Admin/pages/OverallView.css";
//import AdminSidebar from './Admin/pages/Sidebar';
//import { Route, Switch, useLocation } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {Redirect} from 'react-router';
import AdminAboutus from "./Admin/pages/AdminAboutus";
//import Navbar from './components/Navbar';
import { BasicCard } from "./Admin/pages/OverallView";
import LabView from "./Admin/LabsComponent/LabView";
import LabAdd from "./Admin/LabsComponent/LabAdd";
import LabEdit from "./Admin/LabsComponent/LabEdit";
import ViewError from "./Admin/LabsComponent/ViewError";
//import SecondPage from "./components/SecondPage";
import ProblemPage from "./Admin/pages/ProblemPage";
import { AddItem, AddDesc, AddSupp } from "./Admin/LabsComponent/AddItem";
import { ViewDesc, ViewSupp } from "./Admin/LabsComponent/ViewItem";
import AboutUs from "./Lab_in-charge/pages/AboutUs";
import { LabinchargeOverallview } from "./Lab_in-charge/pages/LabinchargeOverallview";
import {
  LabinchargeLab,
  LabinchargeAddEdit,
} from "./Lab_in-charge/pages/LabinchargeLab";
import LabinchargeAboutUs from "./Lab_in-charge/pages/AboutUs";
import {
  LabinchargeViewDesc,
  LabinchargeViewSupp,
} from "./Lab_in-charge/pages/LabinchargeViewItem";
import LabinchargeerrorView from "./Lab_in-charge/pages/LabinchargeViewerror";
import LabinchargeProblemPage from "./Lab_in-charge/pages/LabinchargeProblemPage";
import {
  AdminImageAdd,
  AdminImageView,
  AdminViewImg,
} from "./Admin/LabsComponent/AdminImage";
import { AdminInstructions } from "./Admin/pages/AdminInstructions";
import LabinchargeAboutus from "./Lab_in-charge/pages/LabinchargeAboutus";
import { LabinchargeInstructions } from "./Lab_in-charge/pages/LabinchargeInstructions";

function AdminRoute() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicForm />} />
          <Route path="/Labs/View" exact element={<LabView />} />
          <Route path="/additem/" exact element={<AddItem />} />
          <Route path="/Labs/Add" exact element={<LabAdd />} />
          <Route
            path="/Labs/View/adddesc/:pcid/:desc_id"
            exact
            element={<AddDesc />}
          />
          <Route
            path="/Labs/View/editdesc/:pcid/:desc_id"
            exact
            element={<AddDesc />}
          />
          <Route
            path="/Labs/View/viewdesc/:pcid/:desc_id"
            exact
            element={<ViewDesc />}
          />
          <Route
            path="/Labs/View/addsupp/:pcid/:sup_id"
            exact
            element={<AddSupp />}
          />
          <Route
            path="/Labs/View/editsupp/:pcid/:sup_id"
            exact
            element={<AddSupp />}
          />
          <Route
            path="/Labs/View/viewsupp/:pcid/:sup_id"
            exact
            element={<ViewSupp />}
          />
          <Route path="/problempage/View/:id" exact element={<ViewError />} />
          <Route path="/admin/image/view" element={<AdminImageView />} />
          <Route path="/admin/viewimg/:imgid" element={<AdminViewImg />} />
          <Route path="/Labs/Edit" exact element={<LabEdit />} />
          <Route path="/problempage" exact element={<ProblemPage />} />
          <Route path="/admin/home" element={<BasicCard />} />
          <Route path="/admin/aboutus" exact element={<AdminAboutus />} />
          <Route path="/admin/image/edit/:imgid" element={<AdminImageAdd />} />
          <Route path="/admin/image/add" element={<AdminImageAdd />} />
          <Route path="/admin/instructions" element={<AdminInstructions />} />

          {/******************************************lab incharge Route*******************************************/}

          <Route
            path="/labincharge/home"
            exact
            element={<LabinchargeOverallview labid={""} />}
          />
          <Route path="/labincharge/Labs" exact element={<LabinchargeLab />} />
          {/* <Route path="/Labs/Lab1" exact element={<Lab1/>} /> */}
          <Route
            path="/problem/addEdit"
            exact
            element={<LabinchargeAddEdit />}
          />
          <Route
            path="/ProblemPage/labincharge/update/:id"
            exact
            element={<LabinchargeAddEdit />}
          />
          <Route
            path="/ProblemPage/labincharge/view/:id"
            exact
            element={<LabinchargeerrorView />}
          />
          <Route
            path="/labincharge/Labs/viewdesc/:pcid/:desc_id"
            exact
            element={<LabinchargeViewDesc />}
          />
          <Route
            path="/labincharge/Labs/viewsupp/:pcid/:sup_id"
            exact
            element={<LabinchargeViewSupp />}
          />
          {/* <Route path="/Instructions" exact element={<Instructions/>} /> */}
          {/* <Route path="/Instructions/Instruction1" exact element={<Instruction1/>} />
        <Route path="/Instructions/Instruction2" exact element={<Instruction2/>} /> */}
          <Route
            path="/labincharge/ProblemPage"
            exact
            element={<LabinchargeProblemPage />}
          />
          <Route
            path="/labincharge/aboutus"
            exact
            element={<LabinchargeAboutus />}
          />
          <Route
            path="/labincharge/instructions"
            element={<LabinchargeInstructions />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AdminRoute;
