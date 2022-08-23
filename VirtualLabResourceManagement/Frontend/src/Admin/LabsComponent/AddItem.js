import React,{useState,useEffect} from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom';
import "./AddItem.css";
import axios from 'axios';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'
import Sidebar from "../pages/Sidebar"

const inittialState={ 
    pcid:"",
};
toast.configure();

export const AddItem= () => {
    const location = useLocation()
    const { lab } = location.state
    const[state,setState]=useState(inittialState);
    const {pcid }=state;
    const navigate = useNavigate();
    const { id } =useParams();
    useEffect(()=>{
        if (localStorage.getItem("login_status")=="false") {
            alert("Please Login First");
            navigate("/");
          }
    },[]);

    const handleSubmit =(e) =>{
       
        e.preventDefault();
                axios
                .post("http://localhost:3001/lab/additem",{
                    pcid,
                    lab
                })
                .then(() => {
                    setState({pcid:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("error added successfully",{position: toast.POSITION.TOP_CENTER});
            // }else{
            //     axios
            //     .put(`http://localhost:3001/api/update/${id}`,{
            //         pcid  
            //     })
            //     .then(() => {
            //         setState({pcid:"",type:"",description:""});
            //     })
            //     .catch((err) => toast.error(err.response.data));
            //     toast.success("error Updated successfully",{position: toast.POSITION.TOP_CENTER});
            // }
            setTimeout(() =>  navigate("/Labs/view"), 500);
        
    };

    const handleInputChange = (e) =>{
        const{name,value}=e.target;
        setState({ ...state,[name]: value});
    };

  return (
      <>
      <Sidebar/>
    <div style={{margin:"100px"}}>
        <form style={{
            margin:"auto",
            padding:"15px",
            maxWidth:"400px",
            alignContent:"center"
        }} onSubmit={handleSubmit}
        >
            <label htmlFor="pcid">PC no</label>
            <input
            type="text"
            id="pcid"
            name="pcid"
            placeholder="your pcid ... "
            defaultValue={pcid || ""}
            onChange={handleInputChange}
            />
            <input type="submit"  value={id ? "Update" : "Save"}/>
            <Link to="/Labs/View">
                <input type="button" value="Go back"/>
            </Link>
            {/* <Link to="/Labs">
                <input type="button" value="Go back"/>
            </Link> */}
        </form>
    </div>
    </>
  )
}

//Add description

const inittialDesc={
    ram:"",
    hdd:"",
    manf_name:"",
    mon_type:"",
    purchase_date:"",
    warrenty:""
};
export const AddDesc= () => {
   // const { pcid } =useParams();
   // console.log("params : "+pcid)//

    const location = useLocation()
    const { lab } = location.state
    const[state,setState]=useState(inittialDesc);
    const {ram,hdd,manf_name,mon_type,purchase_date,warrenty}=state;
   // const {id }=state;
   //console.log("id"+id);
    const navigate = useNavigate();
    let { pcid,desc_id } =useParams();
    console.log("type of data : "+typeof(desc_id));
    console.log("len : "+desc_id.length);
    useEffect(()=>{
        if (localStorage.getItem("login_status")=="false") {
            alert("Please Login First");
            navigate("/");
          }
        axios
        .get(`http://localhost:3001/lab/getdesc/${desc_id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[pcid,lab]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!ram||!hdd||!manf_name||!mon_type||!purchase_date||!warrenty){
            console.log("aaya aave")
            toast("Please provide value into each ",{position: toast.POSITION.TOP_CENTER});
        }
        else{
            
            if(desc_id==="null"){
                console.log("add ma desc_params : "+desc_id)
                console.log("add ma aave")
                axios
                .post("http://localhost:3001/lab/adddesc",{
                    ram,hdd,manf_name,mon_type,purchase_date,warrenty,pcid,lab,desc_id
                })
                .then(() => {
                    setState({ ram:"",hdd:"",manf_name:"",mon_type:"",purchase_date:"",warrenty:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("description added successfully",{position: toast.POSITION.TOP_CENTER});
            }else{
                console.log("edit ma desc_params : "+desc_id)
                console.log("edit ma")
                axios
                .put(`http://localhost:3001/lab/editdesc/${desc_id}`,{
                    ram,hdd,manf_name,mon_type,purchase_date,warrenty,pcid,lab,desc_id
                })
                .then(() => {
                    setState({ ram:"",hdd:"",manf_name:"",mon_type:"",purchase_date:"",warrenty:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("error Updated successfully",{position: toast.POSITION.TOP_CENTER});
            }
            setTimeout(() =>  navigate("/Labs/view"), 500);
        }
    };

    const handleInputChange = (e) =>{
        const{name,value}=e.target;
        setState({ ...state,[name]: value});
    };


return(
    <>
    <Sidebar/>
    <div style={{margin:"100px"}}>
    <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
    }} onSubmit={handleSubmit}
    >
        
         {/* className="side-by-side" */}
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
        <input type="submit"  value={desc_id==="null" ?"Save":"Update"}/>
         <Link to="/Labs/View">
            <input type="button" value="Go back"/>
        </Link>
    </form>
</div>
</>
)
}

//xport default Adddesc;

const inittialSupp={
   sup_name:"",
   contact_no:""
};

export const AddSupp= () => {

    const location = useLocation()
    const { lab } = location.state
    const[state,setState]=useState(inittialSupp);
    const {sup_name,contact_no}=state;
   // const {id }=state;
   //console.log("id"+id);
    const navigate = useNavigate();
    let { pcid,sup_id } =useParams();
    //console.log("type of data : "+typeof(desc_id));
    console.log("len : "+sup_id.length);
    useEffect(()=>{
        if (localStorage.getItem("login_status")=="false") {
            alert("Please Login First");
            navigate("/");
          }
        axios
        .get(`http://localhost:3001/lab/getsupp/${sup_id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[pcid,lab]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!sup_name||!contact_no){
            console.log("aaya aave")
            toast("Please provide value into each ",{position: toast.POSITION.TOP_CENTER});
        }
        else{
            
            if(sup_id==="null"){
                //console.log("add ma desc_params : "+desc_id)
                console.log("add ma aave")
                axios
                .post("http://localhost:3001/lab/addsupp",{
                    sup_name,contact_no,pcid,lab
                })
                .then(() => {
                    setState({ sup_name:"",contact_no:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("description added successfully",{position: toast.POSITION.TOP_CENTER});
            }else{
               // console.log("edit ma desc_params : "+desc_id)
                console.log("edit ma")
                axios
                .put(`http://localhost:3001/lab/editsupp/${sup_id}`,{
                    sup_name,contact_no,pcid,lab
                })
                .then(() => {
                    setState({ sup_name:"",contact_no:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("error Updated successfully",{position: toast.POSITION.TOP_CENTER});
            }
            setTimeout(() =>  navigate("/Labs/view"), 500);
        }
    };

    const handleInputChange = (e) =>{
        const{name,value}=e.target;
        setState({ ...state,[name]: value});
    };


  return(
  <>
  <Sidebar/>
    <div style={{margin:"100px"}}>
    <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent:"center"
    }} onSubmit={handleSubmit}
    >
        
         {/* className="side-by-side" */}
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
        
         
        <input type="submit"  value={sup_id==="null" ?"Save":"Update"}/>
         <Link to="/Labs/View">
            <input type="button" value="Go back"/>
        </Link>
    </form>
</div>
</>
  )
}