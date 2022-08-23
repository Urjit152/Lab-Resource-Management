import React, { useState, useEffect } from "react";
import profile from "./images/user.png";
import email from "./images/email.jpg";
import pass from "./images/pass.png";
//import { Navigate } from 'react-router-dom';
import "./App.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";

const axios = require("axios");
export const BasicForm = () => {
  console.log("yes aave");
  const navigate = useNavigate();
  //  const history=useHistory();
  const [user, setUser] = useState({ username: "", password: "" });
  const [LoginStatus, setLoginStatus] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [labid, setLabid] = useState();
  function onLogin() {
    axios
      .post("/login", user)
      .then((response) => {
        if (response.data.message == "admin") {
          setLoginStatus("admin");
          setIsLogin(true);
          localStorage.setItem("login_status", true);
        } else if (response.data.message == "user") {
          setLabid(response.data.data[0].lab_id);
          setLoginStatus("user");
          localStorage.setItem("lab_id", response.data.data[0].lab_id);
          localStorage.setItem("login_status", true);
          setIsLogin(true);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function HandleInput(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const myStyle = {
    backgroundImage:
      "url('https://us.123rf.com/450wm/ismagilov/ismagilov1608/ismagilov160800109/60811634-computer-lab-interior-desktops-on-tables-green-board-posters-on-wall-concept-of-studying-in-modern-t.jpg?ver=6')",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    marginTop: "-50px",
    marginBottom: "10px",
    height: "798px",
  };
  useEffect(() => {
    if (LoginStatus == "admin") {
      navigate("/admin/home");
    } else if (LoginStatus == "user") {
      navigate("/labincharge/home");
    }
    // else
    // {
    //   alert("Please Enter Valid Credentials");
    // }
  }, [LoginStatus]);

  return (
    <>
      <div style={myStyle}>
        <div className="main d-flex">
          <div
            className="sub-main"
            style={{ marginLeft: "-100px", marginTop: "140px" }}
          >
            <div>
              <div className="imgs">
                <div className="container-image">
                  <img src={profile} alt="profile" className="profile" />
                </div>
              </div>
              <div>
                <h2>Register</h2>
                <div>
                  <img src={email} alt="email" className="email" />
                  <input
                    type="text"
                    placeholder="user name"
                    name="username"
                    className="name"
                    onChange={HandleInput}
                  />
                </div>
                <div className="second-input">
                  <img src={pass} alt="pass" className="email" />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="name"
                    onChange={HandleInput}
                  />
                </div>
                <div className="login-button">
                  <button className="btn btn-primary" onClick={onLogin}>
                    Login
                  </button>
                </div>

                <div className="login-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
