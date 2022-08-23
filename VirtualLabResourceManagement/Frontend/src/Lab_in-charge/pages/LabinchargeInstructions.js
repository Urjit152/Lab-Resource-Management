import React from "react";
import "./LabinchargeInstructions.css";
import Sidebar from "../components/Sidebar";
export const LabinchargeInstructions = () => {
  return (
<>
<Sidebar/>
<br/>
<div>
    <div class="card" style={{marginLeft:"600px"}}>
    <div class="container" >
    <div class="card-header" >
    <h1>Instruction for Admin</h1>
    </div>
       <br/>
       <h2>
        <li>Admin can View overall details of all labs.</li> <br/>
        <li>Admin has Authority to Add Lab,Remove Lab.</li><br/>
        <li>Admin can also view all PC Details of all Labs.</li><br/>
        <li>Admin can also Add and View Bill.</li><br/> 
        <li>Admin can only read Registered Problem.</li><br/>
       </h2>
    </div>
    </div>
   <br/>
<div class="card" style={{marginLeft:"600px"}}>
<div class="container">
<div class="card-header">
  <h1>Instruction for Lab in-charge</h1>
</div>
  <br/>
  <h2>
  <li>Lab in-charge can View overall detail of Thier particular lab.</li><br/>
  <li>Lab in-charge has Authority to Add Problem and Mark Problem as Done.</li><br/>
  <li>Lab in-charge can also view all PC Detail of Their Particular Lab.</li><br/>
  <li>Lab in-charge can also View Bill Details.</li><br/> 
  </h2>      
</div>
</div>
</div>
</>
  );
};