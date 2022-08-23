import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import { margin, padding } from "@mui/system";
import { useNavigate, Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { grey } from "@mui/material/colors";
import "./random.css";
import { toast } from "react-toastify";
export default function ProblemPage() {
  const [lab, setLab] = useState([]);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [selectedLab, setSelectedLab] = useState("l01");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login_status")=="false") {
      // alert("Please Login First");
       navigate("/");
     }
    axios.get("http://localhost:3001/l/labs").then((response) => {
      setLab(response.data.result);
      //console.log(response.data.result);
      setLoad(false);
    });
  }, []);

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/get/adminerror/${selectedLab}`
    );
    setData(response.data);
    //console.log("result length "+typeof(response.data.length))
  };

  useEffect(() => {
   
    loadData();
  }, [selectedLab]);

  // setData(response.data);

  function HandleInput(e) {
    setSelectedLab(e.target.value);
  }

  return (
    <>
      <Sidebar />
      <div className="home" style={{ marginLeft: 30 }}>
        {load ? (
          <></>
        ) : (
          <>
            <Grid
              item
              xs={4}
              style={{ height: 100, marginLeft: 300, marginTop: 15 }}
            >
              <FormControl style={{ width: 100 }}>
                <InputLabel id="lb">Labs</InputLabel>
                <Select
                  id="demo-simple-select"
                  placeholder="Labs"
                  labelId="lb"
                  fullWidth
                  value={selectedLab}
                  onChange={HandleInput}
                  //style={{ fontSize: 20, width: '100%' }}
                  label="Labs"
                >
                  {lab.map((item, index) => {
                    return (
                      <MenuItem value={item.lab_id}>{item.lab_name}</MenuItem>
                    );
                  })}
                  {/* {selectedLab!=""?<Temp lab_id={selectedLab}/>:<></>} */}
                </Select>
              </FormControl>
            </Grid>
            {selectedLab != "" ? (
              <div style={{ marginTop: "150px", marginLeft: "-300px" }}>
                {/* <Link to="/addError">
              <button className="btn-Error">Register Error</button>
              </Link> */}
                {data.length === 0 ? (
                  <div
                    style={{
                      border: "15px solid green",
                      borderWidth: "5px",
                      marginTop: 50,
                      textAlign: "center",
                      width: "600px",
                      padding: "50px",
                    }}
                  >
                    <h1>There is no error in LAB{selectedLab[2]}</h1>
                  </div>
                ) : (
                  <>
                  <div >
                    <table
                      className="styled-table"
                      style={{width: 700, textAlign: "center", fontSize: 18 }}
                    >
                      <thead style={{ height: "30px" }}>
                        <tr>
                          <th style={{ textAlign: "center" }}>No.</th>
                          <th style={{ textAlign: "center" }}>PC id</th>
                          <th style={{ textAlign: "center" }}>type of Error</th>
                          <th style={{ textAlign: "center" }}>description</th>
                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.pcid}</td>
                              <td>{item.type}</td>
                              <td>{item.description}</td>
                              <td>
                                <Link to={`./View/${item.id}`}>
                                  <button className="btn btn-view">View</button>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
}
