import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./LabinchargeProblemPage.css";
import {toast} from "react-toastify";
import axios from 'axios';
import LabinchargeSidebar from '../components/Sidebar';

const LabinchargeProblemPage = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const labid=localStorage.getItem("lab_id");
    const loadData = async ()=>{
        const response = await axios.get(`http://localhost:3001/api/get/${labid}`);
        setData(response.data);
    };

    useEffect(()=>{
        if (localStorage.getItem("login_status")=="false") {
            alert("Please Login First");
            navigate("/");
          }
        loadData();
    },[]);

    const deleteError =(id)=>{
        if(window.confirm("Are you sure that you wanted to Mark it as done ?")){
            axios.delete(`http://localhost:3001/api/remove/${id}`);
            toast.success("Error Deleted Successfully",{position: toast.POSITION.TOP_CENTER});
            setTimeout(()=>loadData(),500);
        }
    }

  return (
      <>
      <LabinchargeSidebar/>
    {data.length===0? 
        (
        <div style={{border:"15px solid green",borderWidth:"5px",marginTop:50,textAlign:"center",width:"600px",padding:"50px",marginLeft:"500px",marginTop:"200px"}}>
        <h1 >There is no error in LAB{labid[2]}</h1> 
        </div>
         ):
   (
       <>
    <div style={{marginTop:"150px"}}>
        {/* <Link to="/addError">
        <button className="btn-Error">Register Error</button>
        </Link> */}
        
      <table className="styled-table"style={{width:"1000px"}}>
          <thead>
              <tr>
                  <th style={{textAlign: "center"}}>No.</th>
                  <th style={{textAlign: "center"}}>PC id</th>
                  <th style={{textAlign: "center"}}>type of Error</th>
                  <th style={{textAlign: "center"}}>description</th>
                  <th style={{textAlign: "center"}}>Action</th>
              </tr>
          </thead>
          <tbody >
              {data.map((item,index)=> {
                  return(
                      <tr key={item.id}>
                          <th scope="row">{index+1}</th>
                          <td>{item.pcid}</td>
                          <td>{item.type}</td>
                          <td>{item.description}</td>
                          <td>
                              <Link to={`/ProblemPage/labincharge/Update/${item.id}`}>
                              <button className="btn btn-edit">Edit</button>
                              </Link>
                              <button className="btn btn-delete" onClick={()=> deleteError(item.id)}>Mark As done</button>
                              <Link to={`/ProblemPage/labincharge/view/${item.id}`}>
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
   )
  }
</>
  );
}   

export default LabinchargeProblemPage;
