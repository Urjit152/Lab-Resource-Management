import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./LabinchargeViewerror.css";
import Sidebar from '../components/Sidebar';

export const LabinchargeViewDesc = () => {
    const [user,setUser] = useState({});

    const { desc_id } =useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:3001/lab/getdesc/${desc_id}`)
        .then((resp)=>setUser({...resp.data[0]}));
    },[desc_id]);
  return (
      <>
    <Sidebar/>
    <div style={{marginTop:"100px"}}>
        <div className="card" style={{width:500,height:500}}>
            <div className="card-header" style={{backgroundColor:"grey",width:500,height:70}}>
                <p >Description</p>
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
                    <strong>PC id : </strong>
                    <span>{user.pc_id}</span>
                    <br />
                    <br />
                    <strong>Ram :   </strong>
                    <span>{user.ram}</span>
                    <br/>
                    <br/>
                    <strong>Hdd :   </strong>
                    <span>{user.hdd}</span>
                    <br />
                    <br />
                    <strong>Manufacturer name :   </strong>
                    <span>{user.manf_name}</span>
                    <br/>
                    <br/>
                    <strong>Ram :   </strong>
                    <span>{user.ram}</span>
                    <br/>
                    <br/>
                    <strong>Moniter Type :   </strong>
                    <span>{user.mon_type}</span>
                    <br/>
                    <br/>
                    <strong>Purchase Date :   </strong>
                    <span>{user.purchase_date}</span>
                    <br/>
                    <br/>
                    <strong>Warrenty :   </strong>
                    <span>{user.warrenty}</span>
                    <br/>
                    <br/>
                    <Link to="/labincharge/Labs" >
                    <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
        </div>
    </div>
    </>
  );
};


export const LabinchargeViewSupp = () => {
    const [user,setUser] = useState({});

    const { sup_id } =useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:3001/lab/getsupp/${sup_id}`)
        .then((resp)=>setUser({...resp.data[0]}));
    },[sup_id]);
  return (
      <>
      <Sidebar/>
    <div style={{marginTop:"100px"}}>
        <div className="card" style={{width:500,height:350}}>
            <div className="card-header" style={{backgroundColor:"grey",width:500,height:70}}>
                <p >Description</p>
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
                    <strong>Pc No : </strong>
                    <span>{user.lab_id}</span>
                    <br />
                    <br />
                    <strong>Supplier Name : </strong>
                    <span>{user.sup_name}</span>
                    <br />
                    <br />
                    <strong>Supplier Contact NO. :   </strong>
                    <span>{user.contact_no}</span>
                    <br/>
                    <br/>
                    <Link to="/labincharge/Labs" >
                    <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
        </div>
    </div>
    </>
  );
}