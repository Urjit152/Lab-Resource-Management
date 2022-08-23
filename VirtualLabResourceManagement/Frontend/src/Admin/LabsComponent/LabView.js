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
import Sidebar from "../pages/Sidebar";
import { grey } from "@mui/material/colors";
import { toast } from "react-toastify";
import "../pages/random.css";

function LabView() {
  //console.warn(props);
  const [lab, setLab] = useState([]);
  const [load, setLoad] = useState(true);
  const [selectedLab, setSelectedLab] = useState("l01");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/l/labs").then((response) => {
      setLab(response.data.result);
      //console.log(response.data.result);
      setLoad(false);
    });
  }, []);

  // function GiveTable(){
  //   if(selectedLab!="")
  //     {console.log("this Givetable")
  //       return(<Temp lab_id={selectedLab}/>)}
  //   // return({selectedLab!=""?(<Temp lab_id={selectedLab}/>) :(<></>)});
  // }
  useEffect(() => {
    if (localStorage.getItem("login_status") == "false") {
      //alert("Please Login First");
      navigate("/");
    }
  }, []);

  useEffect(async () => {
    console.log(selectedLab);
    console.log("Aya aave");
    const response = await axios.get(
      `http://localhost:3001/l/labs/pc/${selectedLab}`
    );
    console.log("frontend req : ");
    console.log(response.data);
    setData(response.data.result);
    console.log("state : ");
  }, [selectedLab]);

  const loadData = async () => {
    if (selectedLab != "") {
      console.log("to pn aave");
      const response = await axios.get(
        `http://localhost:3001/l/labs/pc/${selectedLab}`
      );
      console.log("frontend req : ");
      console.log(response.data);
      setData(response.data.result);
      //setData({...data,[e.target.name]:e.target.value});
      console.log("state : ");
    }
  };
  // setData(response.data);
  const deleteItem = (id,desc_id,sup_id,pc_id,lab_id) => {

    console.log(desc_id+" "+sup_id+" "+pc_id+" "+lab_id);
    if (window.confirm("Are you sure you want to delet that item ")) {
      axios.delete(`http://localhost:3001/pc/remove/${id}`);
      toast.success("fac-detail deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => loadData(), 500);
    }
  };
  const deleteLab = () => {
    // console.log("delete id : ")
    // console.log(id)
    if (
      window.confirm(
        "Are you sure you want to delete lab" + selectedLab[1] + selectedLab[2]
      )
    ) {
      axios.delete(`http://localhost:3001/lab/remove/${selectedLab}`);
      toast.success(
        "lab " + selectedLab[1] + selectedLab[2] + " deleted successfully",
        { position: toast.POSITION.TOP_CENTER }
      );
      setTimeout(() => loadData(), 500);
    }
  };

  function HandleInput(e) {
    setSelectedLab(e.target.value);
    //  Temp(selectedLab);
    //return(<div>{selectedLab?<Temp lab_id={selectedLab}/>:<></>} </div>)
    // console.log(selectedLab);
    //  if(selectedLab){
    //   return(<Temp/>);
  }

  // const style = {
  //   //topmargin: 100px
  // };
  // // if(selectedLab)
  // {
  //   return(<Temp/>)
  // }

  return (
    <>
      <Sidebar />
      <div className="home">
        {load ? (
          <></>
        ) : (
          <>
            {/* <Sidebar/> */}
            <Grid
              item
              xs={4}
              style={{ height: 100, marginLeft: 50, marginTop: 10 }}
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
                      <MenuItem value={item.lab_id} key={index}>
                        {item.lab_name}
                      </MenuItem>
                    );
                  })}
                  {/* {selectedLab!=""?<Temp lab_id={selectedLab}/>:<></>} */}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid></Grid>
          <Grid></Grid>
           */}

            {selectedLab != "" ? (
              <div style={{ marginLeft: -250, marginTop: 100 }}>
                {/* <Sidebar/> */}
                <Link to="/additem" state={{ lab: selectedLab }}>
                  <button className="btn-contact">Add PC</button>
                </Link>
                <button
                  className="btn-contact"
                  style={{
                    backgroundColor: "Orange",
                    width: "150px",
                    height: "40px",
                    marginLeft: "500px",
                  }}
                  onClick={() => deleteLab()}
                >
                  delete sw{selectedLab[2]}
                </button>
                <table
                  className="styled-table"
                  style={{ width: 1000, textAlign: "center", fontSize: 18 }}
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>PC No.</th>
                      <th style={{ textAlign: "center" }}>Description</th>
                      <th style={{ textAlign: "center" }}>Suppliers-details</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                      {/* <th style={{textAlign: "center"}}>Fac_id</th>
                <th style={{textAlign: "center"}}>Action</th> */}
                    </tr>
                  </thead>
                  <tbody >
                    {/* {console.log("hey : ")}
          {console.log(data)} */}
                    {data.map((item, id) => {
                      //console.log("item : "+item.lab_id+" "+item.pc_no+" "+item.id)

                      return (
                        <>
                          {/*  */}
                          <tr key={id}>
                            {/* <td scope="row">{index+1}</td> */}
                            <td>{item.pc_no}</td>
                            {/* <td>{item.lb_id}</td>
                        <td>{item.fac_id}</td> */}
                            <td>
                              {!item.desc_id ? (
                                <Link
                                  to={`./adddesc/${item.pc_no}/${item.desc_id}`}
                                  state={{ lab: selectedLab }}
                                >
                                  <button
                                    className="btn btn-edit"
                                    style={{ width: 60 }}
                                  >
                                    Add
                                  </button>
                                </Link>
                              ) : (
                                <Link
                                  to={`./editdesc/${item.pc_no}/${item.desc_id}`}
                                  state={{ lab: selectedLab }}
                                >
                                  <button
                                    className="btn btn-edit"
                                    style={{ width: 60 }}
                                  >
                                    Edit
                                  </button>
                                </Link>
                              )}
                              <Link
                                to={`./viewdesc/${item.pc_no}/${item.desc_id}`}
                              >
                                <button
                                  className="btn btn-edit"
                                  style={{ width: 60 }}
                                >
                                  View
                                </button>
                              </Link>
                            </td>
                            <td>
                              {/* <button className="btn btn-delete" onClick={()=> deleteFac(item.id)}>Delete</button> */}
                              {!item.sup_id ? (
                                <Link
                                  to={`./addsupp/${item.pc_no}/${item.sup_id}`}
                                  state={{ lab: selectedLab }}
                                >
                                  <button
                                    className="btn btn-view"
                                    style={{ width: 60 }}
                                  >
                                    Add
                                  </button>
                                </Link>
                              ) : (
                                <Link
                                  to={`./editsupp/${item.pc_no}/${item.sup_id}`}
                                  state={{ lab: selectedLab }}
                                >
                                  <button
                                    className="btn btn-view"
                                    style={{ width: 60 }}
                                  >
                                    Edit
                                  </button>
                                </Link>
                              )}
                              <Link
                                to={`./viewsupp/${item.pc_no}/${item.sup_id}`}
                              >
                                <button
                                  className="btn btn-view"
                                  style={{ width: 60 }}
                                >
                                  View
                                </button>
                              </Link>
                            </td>
                            <td>
                              {/* <button className="btn btn-delete" onClick={()=> deleteFac(item.id)}>Delete</button> */}
                              <button
                                className="btn btn-delete"
                                onClick={() => deleteItem(item.id,item.desc_id,item.sup_id,item.pc_no,item.lab_id)}
                              >
                                Delete
                              </button>
                              {/* <button className="btn btn-edit" onClick={()=> deleteFac(item.id)}>Edit</button> */}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
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

export default LabView;
//props.location.id

// import * as React from 'react';

// export default function BasicSelect() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Age</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={age}
//           label="Age"
//           onChange={handleChange}
//         >
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }
