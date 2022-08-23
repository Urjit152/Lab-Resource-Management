import React,{useState,useEffect} from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "emailjs-com" 
import Sidebar from '../components/Sidebar';
export const LabinchargeLab = () => {
    //console.log("lab ma pn "+labid)
    const labid=localStorage.getItem("lab_id")
    const[data,setData]=useState([])
    const navigate=useNavigate();
    useEffect(() => {
        if (localStorage.getItem("login_status")=="false") {
            alert("Please Login First");
            navigate("/");
          }
    }, [])
    
    useEffect(async() => {
        //console.log(selectedLab);
       
        console.log("Aya aave");
        const response = await axios.get(`http://localhost:3001/l/labs/pc/${labid}`);
          console.log("frontend req : ")
          console.log(response.data)
          setData(response.data.result);
          //setData({...data,[e.target.name]:e.target.value});
          console.log("state : ")
      }, []);

   return (
     
    <>
    <Sidebar/>
    <div className="Labs">
        <h1 style={{textAlign:"center"}}>Your Lab SW{labid[2]}</h1>
      <Link to="/problem/addEdit">
        <button className="btn-Error" style={{marginTop:50,marginLeft:505}}>Register Error</button>
      </Link>
    </div>
    <div>
    <table className="styled-table" style={{width:500,textAlign:"center",fontSize:18}}>
        <thead >
            <tr>
                <th style={{textAlign: "center"}}>PC No.</th>
                <th style={{textAlign: "center"}}>Description</th>
                <th style={{textAlign: "center"}}>Suppliers-details</th>
                {/* <th style={{textAlign: "center"}}>Action</th> */}
                {/* <th style={{textAlign: "center"}}>Fac_id</th>
                <th style={{textAlign: "center"}}>Action</th> */}
            </tr>
        </thead>
        <tbody>
         {/* {console.log("hey : ")}
          {console.log(data)} */}
            {data.map((item,index)=> {
                return(
                    <tr key={item.id}>
                        {/* <td scope="row">{index+1}</td> */}
                        <td>{item.pc_no}</td>
                        {/* <td>{item.lb_id}</td>
                        <td>{item.fac_id}</td> */}
                        <td>         
                           <Link to={`/labincharge/Labs/viewdesc/${item.pc_no}/${item.desc_id}`}>
                            <button className="btn btn-edit"style={{width:60}}>View</button>
                            </Link>
                        </td>
                        <td>
                            {/* <button className="btn btn-delete" onClick={()=> deleteFac(item.id)}>Delete</button> */}
                            <Link to={`/labincharge/Labs/viewsupp/${item.pc_no}/${item.sup_id}`} >
                            <button className="btn btn-view" style={{width:60}}>View</button>
                            </Link>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
  </div>

 </>
  );
};










// export const Lab1 = ({labid}) => {

//   return (
//     <div className="Lab1">
//       <h1>This is+{labid}</h1>
//       <Link to="/addEdit">
//         <button className="btn-Error">Register Error</button>
//       </Link>
//     </div>
//   );
// };

const inittialState={ 
    pcid:"",
    type:"",
    description:"",
    tdate:"",
    lid:""
};
toast.configure();

export const LabinchargeAddEdit= () => {
    const labid=localStorage.getItem("lab_id")
    const[state,setState]=useState(inittialState);
    const {pcid,type,description,tdate,lid}=state;
    const navigate = useNavigate();
    const { id } =useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:3001/api/geterror/${id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[id]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!pcid||!type||!description||!tdate){
            console.log("aaya aave")
            toast("Please provide value into each ",{position: toast.POSITION.TOP_CENTER});
        }
        else{
            if(!id){
                console.log("add ma aave")
                axios
                .post("http://localhost:3001/api/post",{
                    pcid,
                    type,
                    labid,
                    description,
                    tdate
                })
                .then(() => {
                    setState({pcid:"",type:"",description:"",tdate:"",lid:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("error added successfully",{position: toast.POSITION.TOP_CENTER});
            }else{
                console.log("edit ma aave")
                axios
                .put(`http://localhost:3001/api/update/${id}`,{
                    pcid,
                    type,
                    labid,
                    description,
                    tdate
                })
                .then(() => {
                    setState({pcid:"",type:"",description:"",tdate:"",lid:""});
                })
                .catch((err) => toast.error(err.response.data));
                toast.success("error Updated successfully",{position: toast.POSITION.TOP_CENTER});
            }
            emailjs.sendForm('service_yq6hrzc', 'template_j56vrfg', e.target, 'qDgZaP3NAp8GNRZR6')
            setTimeout(() =>  navigate("/labincharge/ProblemPage"), 500);
        }
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
            <label htmlFor="pcid">PC id</label>
            <input
            type="text"
            id="pcid"
            name="pcid"
            placeholder="your pcid ... "
            defaultValue={pcid || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="type">Error Type</label>
            <input
            type="text"
            id="type"
            name="type"
            placeholder="your error type ..."
            defaultValue={type || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="description">Error Description</label>
            <input
            type="des"
            id="description"
            name="description"
            placeholder="your description ..."
            defaultValue={description || ""}
            onChange={handleInputChange}
            />
            <label htmlFor="tdate">Enter Date</label>
            <input
            type="date"
            id="tdate"
            name="tdate"
            placeholder="today's date ..."
            defaultValue={tdate || ""}
            onChange={handleInputChange}
            />
             <label htmlFor="tdate">Enter Lab ID</label>
            <input
            type="text"
            id="lid"
            name="lid"
            placeholder="Lab id ..."
            defaultValue={lid || ""}
            onChange={handleInputChange}
            />
            <input type="submit"  value={id ? "Update" : "Save"}/>
            <Link to="/labincharge/ProblemPage">
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