import React, { useState ,useEffect} from "react";
import styled from "styled-components";
//port { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from './SubMenu';
import { IconContext } from "react-icons/lib";
import {  Switch, Route, Link ,useNavigate} from "react-router-dom";
import { withRouter } from "react-router";
import OverallView from "./OverallView";
import LabView from "../LabsComponent/LabView";

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
  
const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`
  
const SidebarWrap = styled.div`
  width: 100%;
`;
  
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);  
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  function LogOutClicked()
  {
    console.log("click thay")
    localStorage.setItem("login_status",false)
    navigate("/");
  }
  useEffect(() => {
    if (localStorage.getItem("login_status")=="false") {
      alert("Please Login First");
      navigate("/");
    }
  }, [])
  
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h1
            style={{ textAlign: "center", 
                     marginLeft: "400px", 
                     color: "white" }}
          >
           Lab Resource Management
           <button style={{borderRadius:"5px",marginLeft:"400px",width:"100px",height:"40px",backgroundColor:"orange"}} onClick={LogOutClicked}>logout</button>
          </h1>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>

      {/* <main role="main">
          <div className="main">
            <Switch>
              <Route path={"/overallview"}>
                <OverallView />
              </Route>
              <Route path={"/labs/view"}>
                <LabView />
              </Route>
              
              {/* <Route path="*">
                <NotFound />
              </Route> */}
            {/* </Switch>
          </div>
        </main> */} 
    </>
  );
};
  
export default Sidebar;