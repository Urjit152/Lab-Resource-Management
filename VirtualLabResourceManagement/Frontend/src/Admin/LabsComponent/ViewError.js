import React,{useState,useEffect} from 'react';
import { Link, useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./ViewErroradmin.css";
import Sidebar from '../pages/Sidebar';

const View = () => {
    const [user,setUser] = useState({});

    const { id } =useParams();
    const navigate =useNavigate()
    useEffect(() => {
        if (localStorage.getItem("login_status")=="false") {
         //   alert("Please Login First");
            navigate("/");
          }
    }, [])
    
    useEffect(()=>{
        axios
        .get(`http://localhost:3001/api/view/${id}`)
        .then((resp)=>setUser({...resp.data[0]}));
    },[id]);
  return (
      <>
      <Sidebar/>
    <div style={{marginTop:"150px"}}>
        <div className="card">
            <div className="card-header">
                <p>Error Detail</p>
                </div>
                <div className="container">
                    {/* <strong>ID :</strong>
                    <span>{id}</span>
                    <br />
                    <br /> */}
                    <strong>PC id :</strong>
                    <span>{user.pcid}</span>
                    <br />
                    <br />
                    <strong>Type :</strong>
                    <span>{user.type}</span>
                    <br />
                    <br />
                    <strong>Description :</strong>
                    <span>{user.description}</span>
                    <br />
                    <br />
                    <strong>Error Registration Date : </strong>
                    <span>{user.tdate}</span>
                    <br />
                    <br />
                    <Link to="/ProblemPage">
                    <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
        </div>
    </div>
    </>
  );
};

export default View
