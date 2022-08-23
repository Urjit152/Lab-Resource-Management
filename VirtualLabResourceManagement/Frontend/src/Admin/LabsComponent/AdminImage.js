import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
//import "./Addimg.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import { margin, padding } from "@mui/system";

export function AdminImageView() {
  //console.warn(props);
  const [lab, setLab] = useState([]);
  const [load, setLoad] = useState(true);
  const [selectedLab, setSelectedLab] = useState("l01");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("login_status") == "false") {
      //alert("Please Login First");
      navigate("/");
    }
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

  useEffect(async () => {
    console.log(selectedLab);
    console.log("Aya aave");
    const response = await axios.get(
      `http://localhost:3001/l/labs/img/${selectedLab}`
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
        `http://localhost:3001/l/labs/img/${selectedLab}`
      );
      console.log("frontend req image: ");
      console.log(response.data);
      setData(response.data.result);
      //setData({...data,[e.target.name]:e.target.value});
      console.log("state : ");
    }
  };
  // setData(response.data);
  const deleteImg = (id) => {
    console.log("delete id : ");
    console.log(id);
    if (window.confirm("Are you sure you want to delet that image ")) {
      axios.delete(`http://localhost:3001/admin/img/remove/${id}`);
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
                      <MenuItem value={item.lab_id}>{item.lab_id}</MenuItem>
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
                <Link to="/admin/image/add">
                  <button className="btn-contact" style={{width:"20%"}}>Add Bill Details</button>
                </Link>
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
                    <h1>There is no Image in LAB{selectedLab[2]}</h1>
                  </div>
                ) : (
                  <>
                    <table
                      className="styled-table"
                      style={{ width: 1000, textAlign: "center", fontSize: 18 }}
                    >
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>PC No.</th>
                          <th style={{ textAlign: "center" }}>Image</th>

                          {/* <th style={{textAlign: "center"}}>Fac_id</th>
                  <th style={{textAlign: "center"}}>Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* {console.log("hey : ")}
            {console.log(data)} */}
                        {data.map((item, index) => {
                          //console.log("item : "+item.lab_id+" "+item.pc_no+" "+item.id)

                          return (
                            <>
                              {/*  */}
                              <tr key={item.imgid}>
                                {/* <td scope="row">{index+1}</td> */}
                                <td>{index + 1}</td>
                                {/* <td>{item.lb_id}</td>
                          <td>{item.fac_id}</td> */}
                                <td>
                                  <Link
                                    to={`/admin/image/edit/${item.imgid}`}
                                    state={{ lab: selectedLab }}
                                  >
                                    <button
                                      className="btn btn-edit"
                                      style={{ width: 60 }}
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  <Link to={`/admin/viewimg/${item.imgid}`}>
                                    <button
                                      className="btn btn-edit"
                                      style={{ width: 60 }}
                                    >
                                      View
                                    </button>
                                  </Link>
                                  <button
                                    className="btn btn-delete"
                                    style={{ width: 60 }}
                                    onClick={() => deleteImg(item.imgid)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
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

const inittialImg = {
  lab_id: "",
  invoicenum: "",
  suppname: "",
  invdate: "",
  podate: "",
  itemname: "",
  itemdesc: "",
  quantity: "",
  rate: "",
  total_amt: "",
};

export function AdminImageAdd() {
  const location = useLocation();
  const { imgid } = useParams();
  const [state, setState] = useState(inittialImg);
  const {
    lab_id,
    invoicenum,
    suppname,
    invdate,
    podate,
    itemname,
    itemdesc,
    quantity,
    rate,
    total_amt,
  } = state;

  const navigate = useNavigate();
  //  let { pcid,desc_id } =useParams();
  console.log("add " + imgid);
  useEffect(() => {
    if (imgid) {
      axios.get(`http://localhost:3001/lab/getimg/${imgid}`).then((resp) => {
        setState({ ...resp.data[0] });
      });
    }
  }, [imgid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !invoicenum ||
      !suppname ||
      !invdate ||
      !podate ||
      !itemname ||
      !itemdesc ||
      !quantity ||
      !rate ||
      !total_amt
    ) {
      console.log("aaya aave");
      toast("Please provide values ", { position: toast.POSITION.TOP_CENTER });
    } else if (imgid) {
      // console.log("add ma desc_paitemnames : "+desc_id)
      axios
        .put(`http://localhost:3001/lab/editimg/${imgid}`, {
          lab_id,
          invoicenum,
          suppname,
          invdate,
          podate,
          itemname,
          itemdesc,
          quantity,
          rate,
          total_amt,
        })
        .then(() => {
          setState({
            itemname: "",
            itemdesc: "",
            quantity: "",
            rate: "",
            total_amt: "",
            lab_id: "",
            invdate: "",
            podate: "",
            invoicee_number: "",
            suppname: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("image details Updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      axios
        .post("http://localhost:3001/admin/imgadd", {
          lab_id,
          invoicenum,
          suppname,
          invdate,
          podate,
          itemname,
          itemdesc,
          quantity,
          rate,
          total_amt,
        })
        .then(() => {
          setState({
            itemname: "",
            itemdesc: "",
            quantity: "",
            rate: "",
            total_amt: "",
            lab_id: "",
            invdate: "",
            podate: "",
            invoicee_number: "",
            suppname: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("image details added successfully", {
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
          <label htmlFor="lab_id">Lab id : </label>
          <input
            type="text"
            id="lab_id"
            name="lab_id"
            placeholder="Enter invoice number"
            defaultValue={lab_id || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="invoicenum">Invoice Number : </label>
          <input
            type="text"
            id="invoicenum"
            name="invoicenum"
            placeholder="Enter invoice number"
            defaultValue={invoicenum || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="podate">p o date : </label>
          <input
            type="date"
            id="podate"
            name="podate"
            placeholder="Enter Number of P.o number "
            defaultValue={podate || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="invdate">invoice date : </label>
          <input
            type="date"
            id="invdate"
            name="invdate"
            placeholder="Enter invoice date "
            defaultValue={invdate || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="suppname">Supplier name : </label>
          <input
            type="text"
            id="suppname"
            name="suppname"
            placeholder="Enter supplier name "
            defaultValue={suppname || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="itemname">item name :</label>
          <input
            type="text"
            id="itemname"
            name="itemname"
            placeholder="Enter item name"
            defaultValue={itemname || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="itemdesc">item description :</label>
          <input
            type="text"
            id="itemdesc"
            name="itemdesc"
            placeholder="Enter item description "
            defaultValue={itemdesc || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="quantity">Quantity :</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter total quantity"
            defaultValue={quantity || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="rate">Rate Per Piece :</label>
          <input
            type="number"
            id="rate"
            name="rate"
            placeholder="Enter rate per piece "
            defaultValue={rate || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="total_amt">total amount :</label>
          <input
            type="number"
            id="total_amt"
            name="total_amt"
            placeholder="Enter total amount "
            defaultValue={total_amt || ""}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            value={typeof imgid == "string" ? "Update" : "Save"}
          />
          <Link to="/admin/image/view">
            <input type="button" value="Go back" />
          </Link>
        </form>
      </div>
    </>
  );
}

export const AdminViewImg = () => {
  const [user, setUser] = useState({});

  const { imgid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login_status") == "false") {
      alert("Please Login First");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/lab/viewimg/${imgid}`).then((resp) => {
      setUser({ ...resp.data[0] });
      console.log("loda " + resp.data[0]);
    });
  }, []);
  return (
    <>
      <Sidebar />
      <div style={{ marginTop: "100px" }}>
        <div className="card" style={{ width: 500, height: 600 }}>
          <div
            className="card-header"
            style={{ backgroundColor: "grey", width: 500, height: 70 }}
          >
            <p>Image</p>
          </div>
          <div className="container">
            {/* <strong>ID :</strong>
                    <span>{id}</span>
                    <br />
                    <br /> */}
            <strong>Lab : </strong>
            <span>{user.lab_id}</span>
            <br />
            <br />
            <strong>Invoicenum : </strong>
            <span>{user.invoicenum}</span>
            <br />
            <br />
            <strong>podate : </strong>
            <span>{user.podate}</span>
            <br />
            <br />
            <strong>Invoice Date : </strong>
            <span>{user.invdate}</span>
            <br />
            <br />
            <strong>Supplier name : </strong>
            <span>{user.suppname}</span>
            <br />
            <br />
            <strong>Item Name : </strong>
            <span>{user.itemname}</span>
            <br />
            <br />
            <strong>Item Description : </strong>
            <span>{user.itemdesc}</span>
            <br />
            <br />
            <strong>Quantity : </strong>
            <span>{user.quantity}</span>
            <br />
            <br />
            <strong>Rate Per Item : </strong>
            <span>{user.rate}</span>
            <br />
            <br />
            <strong>Total amount : </strong>
            <span>{user.total_amt}</span>
            <br />
            <br />
            <Link to="/admin/image/view">
              <div className="btn btn-edit">Go Back</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
