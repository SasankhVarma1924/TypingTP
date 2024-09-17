import React from "react";
import "./index.css"
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginPage()
{
  const navigate = useNavigate();
  
  const handleLoginPageOnClick = () =>
  {
    try {
      navigate('/login');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }

  const handleHomePageOnClick = () =>
  {
    const loginPageContainer = document.querySelector(".loginPageContainer");
    loginPageContainer.classList.add("fade-out");
    setTimeout(() => {
      navigate("/");
    }, 250);
  }

  const handleSignUpOnClick = async () =>
  {
    const uname = document.getElementById("username").value;
    const pwd = document.getElementById("password").value;
    const user = {username: uname, password: pwd};
    const response = await fetch("http://localhost:5000/login/signup", {
        method:"POST",
        headers:{
          "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    const res = await response.json();
    console.log(res.msg);
  }

  const handleSignInOnClick = async () =>
  {
    const uname = document.getElementById("username").value;
    const pwd = document.getElementById("password").value;
    const user = {username: uname, password: pwd};
    const response = await fetch("http://localhost:5000/login/signin", {
        method:"POST",
        headers:{
          "Content-type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    const res = await response.json();
    console.log(res.msg);
  }

  return (
    <>

      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 className="homePageIcon" onClick={handleHomePageOnClick}>TypingTP</h1>
        <FaRegUser className="loginPageIcon" size={20} onClick={handleLoginPageOnClick}/>
      </div>

      <div className="loginPageContainer">

        <div style={{display:"flex", alignItems:"center", flexDirection:"column", marginTop:"40px"}}>
          <input className="loginForm" type="text" id="username" name="username" placeholder="username"/>
          <input className="loginForm" type="text" id="password" name="password" placeholder="password"/>
        </div>

        <div style={{display:"flex", alignItems:"center"}}>
          <button className="loginButtons" style={{marginLeft:"auto", marginRight:"5px"}} onClick={handleSignUpOnClick}>sign up</button>
          <button className="loginButtons" style={{marginRight:"auto", marginLeft:"5px"}} onClick={handleSignInOnClick}>sign in</button>
        </div>

      </div>

    </>
  )
}

export default LoginPage;