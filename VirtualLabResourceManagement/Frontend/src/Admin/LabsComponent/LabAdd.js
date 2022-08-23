import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import "./AddItem.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

const inittialLab = {
  labincharge_name: "",
  psword: "",
  lab_id: "",
  count: "",
  ram: "",
  hdd: "",
  manf_name: "",
  mon_type: "",
  purchase_date: "",
  warrenty: "",
  sup_name: "",
  contact_no: "",
};

export default function LabAdd() {
  const location = useLocation();
  // const { lab } = location.state
  const [state, setState] = useState(inittialLab);
  const {
    labincharge_name,
    psword,
    lab_id,
    count,
    ram,
    hdd,
    manf_name,
    mon_type,
    purchase_date,
    warrenty,
    sup_name,
    contact_no,
  } = state;
  const navigate = useNavigate();
  let { pcid, desc_id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("login_status") == "false") {
      alert("Please Login First");
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !labincharge_name ||
      !psword ||
      !lab_id ||
      !count ||
      !ram ||
      !hdd ||
      !manf_name ||
      !mon_type ||
      !purchase_date ||
      !warrenty ||
      !sup_name ||
      !contact_no
    ) {
      console.log("aaya aave");
      toast("Please provide value into each ", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      // if(desc_id==="null"){
      console.log("add ma desc_params : " + desc_id);
      console.log("add ma aave");
      axios
        .post("http://localhost:3001/labadd", {
          labincharge_name,
          psword,
          lab_id,
          count,
          ram,
          hdd,
          manf_name,
          mon_type,
          purchase_date,
          warrenty,
          sup_name,
          contact_no,
        })
        .then(() => {
          setState({
            ram: "",
            hdd: "",
            manf_name: "",
            mon_type: "",
            purchase_date: "",
            warrenty: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("description added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => navigate("/Labs/view"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <Sidebar />
      <div style={{ margin: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          {/* className="side-by-side" */}
          <label htmlFor="labincharge_name">Labincharge Name : </label>
          <input
            type="text"
            id="labincharge_name"
            name="labincharge_name"
            placeholder="Enter Labincharge Name"
            defaultValue={labincharge_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="count">Count : </label>
          <input
            type="number"
            id="count"
            name="count"
            placeholder="Enter Number of PC "
            defaultValue={count || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="lab_id">Lab id : </label>
          <input
            type="text"
            id="lab_id"
            name="lab_id"
            placeholder="Enter Lab id "
            defaultValue={lab_id || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="psword">password : </label>
          <input
            type="password"
            id="psword"
            name="psword"
            placeholder="Enter password "
            defaultValue={psword || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="ram">RAM</label>
          <input
            type="text"
            id="ram"
            name="ram"
            placeholder="Enter RAM"
            defaultValue={ram || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="pcid">Hdd</label>
          <input
            type="text"
            id="hdd"
            name="hdd"
            placeholder="Enter Hdd "
            defaultValue={hdd || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="manf_name">Manufacturer name</label>
          <input
            type="text"
            id="manf_name"
            name="manf_name"
            placeholder="Enter Manufacturer name"
            defaultValue={manf_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="mon_type">Moniter Type</label>
          <input
            type="text"
            id="mon_type"
            name="mon_type"
            placeholder="Enter moniter type "
            defaultValue={mon_type || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="purchase_date">Purchase Date</label>
          <input
            type="text"
            id="purchase_date"
            name="purchase_date"
            placeholder="Enter purchase date "
            defaultValue={purchase_date || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="warrenty">Warrenty</label>
          <input
            type="text"
            id="warrenty"
            name="warrenty"
            placeholder="Enter warrenty "
            defaultValue={warrenty || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="ram">Supplier Name</label>
          <input
            type="text"
            id="sup_name"
            name="sup_name"
            placeholder="Enter Supplier Name"
            defaultValue={sup_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="pcid">Supplier contact</label>
          <input
            type="text"
            id="contact_no"
            name="contact_no"
            placeholder="Enter Contact NO.  "
            defaultValue={contact_no || ""}
            onChange={handleInputChange}
          />

          <input type="submit" value={"Save"} />
          <Link to="/Labs/View">
            <input type="button" value="Go back" />
          </Link>
        </form>
      </div>
    </>
  );
}
