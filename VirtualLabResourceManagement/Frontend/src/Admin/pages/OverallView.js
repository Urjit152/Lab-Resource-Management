import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import "./random.css";
import "./oview.css";
import { toast } from "react-toastify";
import axios from "axios";
//
import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export function BasicCard() {
  const [lab, setLab] = useState([]);
  const [errorcount, setErrorcount] = useState([]);
  const [pccount, setPccount] = useState([]);
  const [flag, setFlag] = useState(true);
  const [details, setDetails] = useState([{ lab_id: "", count: "" }]);
  // const [count,setCount]=useState();
  useEffect(() => {
    axios.get("http://localhost:3001/l/labsin").then((response) => {
      setLab(response.data.result);
      //console.log(response.data.result);
      // setLoad(false);
    });

    axios.get("http://localhost:3001/labs/error").then((response) => {
      setErrorcount(response.data.result);
      // console.log(response.data.result)
      //console.log(response.data.result);
      // setLoad(false);
    });

    axios.get("http://localhost:3001/labs/pc").then((response) => {
      setPccount(response.data.result);
      // console.log(response.data.result);
    });
  }, []);

  function gaveerr(lab_id) {
    let count = 0;
    errorcount.map((item, index) => {
      if (item.lab_id === lab_id) {
        //console.log("aama aave to 6"+typeof(item.count))
        count = item.count;
      }
    });
    return count;
  }

  function gavepc(lab_id) {
    let count = 0;
    pccount.map((item, index) => {
      if (item.lab_id === lab_id) {
        //console.log("aama aave to 6"+typeof(item.count))
        count = item.count;
      }
    });
    return count;
  }

  return (
    <>
      <Sidebar />
      {lab.map((item, index) => {
        // console.log("lab_id"+item.lab_id+"status : "+errorExists(item.lab_id))
        return (
          <div style={{ marginTop: "50px", marginLeft: "100px" }} key={index}>
            <div className="card" style={{ width: 750, height: 300 ,border:"3px solid black"}}>
              <div
                className="card-header"
                style={{ width:"745px", height: 70 ,backgroundColor: "#50adff",backgroundColor:"grey"}}
              >
                <b><p style={{fontSize:"30px",color:"black"}}>{item.lab_name}</p></b>
              </div>
              <div className="container" style={{fontSize:"25px"}}>
                <strong>Lab in-charge name : {item.labincharge_name} </strong>
                <br />
                <br />
                <strong>pc count : {gavepc(item.lab_id)} </strong>
                <br />
                <br />
                <strong>Error : {gaveerr(item.lab_id)} </strong>
                <br />
                <br />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
