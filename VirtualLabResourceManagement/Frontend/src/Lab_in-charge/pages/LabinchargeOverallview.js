import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./random.css";
import "./LabinchargeOverallview.css";
import { toast } from "react-toastify";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export function LabinchargeOverallview() {
  const [lab, setLab] = useState([]);
  const [errorcount, setErrorcount] = useState([]);
  const [pccount, setPccount] = useState([]);
  const [flag, setFlag] = useState(true);
  const [details, setDetails] = useState([{ lab_id: "", count: "" }]);
  const labid = localStorage.getItem("lab_id");
  const navigate = useNavigate();
  // const [count,setCount]=useState();
  useEffect(() => {
    if (localStorage.getItem("login_status")=="false") {
      alert("Please Login First");
      navigate("/");
    }
    axios.get(`http://localhost:3001/l/labsin/${labid}`).then((response) => {
      setLab(response.data.result);
      console.log("lb side" + response.data.result[0].labincharge_name);
      //console.log(response.data.result);
      // setLoad(false);
    });
    //  setLab(labid);
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

    // lab.map((item,index)=>{
    //     errorcount.map((item1,ind)=>{
    //         if(item.lab_id===item1.lab_id)
    //         {
    //             setDetails({lab_id:item.lab_id,count:item1.count})
    //         }
    //         if(item.lab_id===item1.lab_id)
    //         {
    //             setDetails({lab_id:item.lab_id,count:0})
    //         }
    //     })
    // })
  }, [labid]);

  //   console.log("here "+details[0].lab_id)
  //   function errorExists(name) {
  //     return errorcount.some(function(el) {
  //       return el.lab_id === name;
  //     });
  //   }

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
      {
        <>
          <Sidebar />
          {lab.map((item, index) => {
            // console.log("lab_id"+item.lab_id+"status : "+errorExists(item.lab_id))
            return (
              <div style={{ marginTop: "50px", marginLeft: "100px" }}>
                <div className="card" style={{ width: 500, height: 400,border:"1.5px solid black" }}>
                  <div
                    className="card-header"
                    style={{ backgroundColor: "#50adff", width: 498, height: 200 }}
                  >
                  <p> <h2>{item.lab_name}</h2></p>
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <div className="container" style={{marginLeft:"60px",marginTop:"-30px"}}>
                    {/* <strong>ID :</strong>
                    <span>{id}</span>
                    <br />
                    <br /> */}
                    <h2>
                    <strong>
                      Lab in-charge name : {item.labincharge_name}{" "}
                    </strong>
                    <br />
                    <br />
                    <strong>pc count : {gavepc(item.lab_id)} </strong>
                    <br />
                    <br />
                    <strong>Error : {gaveerr(item.lab_id)} </strong>
                    <br />
                    <br />
                    </h2>
                    {/* {errorcount.map((item1,index)=>{
                        {console.log("i1 id "+item1.lab_id+" "+item.lab_id)}
                        {item.lab_id===item1.lab_id?(
                            
                            <>
                            {console.log("raju")}
                            <strong>Error count: {item1.count}</strong>
                            </>
                            
                       
                        )
                        :
                        (<></>)
                        }                       
                       }
                    )} */}

                    <br />
                    <br />
                  </div>
                </div>
              </div>
            );
          })}
        </>
}
     </>
     )
    
}
