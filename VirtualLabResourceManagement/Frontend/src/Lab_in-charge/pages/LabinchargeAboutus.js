import 'bootstrap';
import Sidebar from '../components/Sidebar';
function LabinchargeAboutUs() {
    return (
        <>
        <Sidebar/>
            {/* <Navbar name="home"/> */}
            <br/>
            <h1 style={{textAlign:'center'}}>Our Team</h1>
            <div style={{display:"flex",width:"50%",justifyContent:"space-around",margin:"auto",marginTop:"2%"}}>
            <div className="card">
                <img src="../urjit.jpg" alt="avatar" style={{width:"100%"}} />
                <div className="container">
                    <h4><b>Urjit Vichhiya</b></h4>
                    <p>Roll No : IT182</p>
                    <p>Div : I/I4</p>
                    <p>6th sem student of DDU(IT Department)</p>
                </div>
            </div> 
            <div className="card">
                <img src="../raj.jpeg" alt="a.png" style={{width:"100%",height:"350px"}} />
                <div className="container">
                    <h4><b>Raj Thumar</b></h4>
                    <p>Roll No : IT168</p>
                    <p>Div : I/I4</p>
                    <p>6th sem student of DDU(IT Department)</p>
                </div>
            </div>
            </div>
</>
        
  )
}
export default LabinchargeAboutUs;