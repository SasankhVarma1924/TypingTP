import { UserContext } from "./GlobalState";
import React, { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import "./index.css"

function AccountPage()
{
  const {username} = useContext(UserContext);
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(UserContext);
  const [tests, setTests] = useState(0);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    const getUserDetails = async () =>
    {
      const response = await fetch(`http://localhost:5000/account/userDetails/${username}`, {
        method:"GET"
      })
      const userDetails = await response.json();
      setTests(userDetails.tests);
      setWpm(userDetails.wpm);
    }
    getUserDetails();
  }, []);

  const handleLoginPageOnClick = () =>
  {
    if(isLoggedIn)
    {
      navigate("/account");
    }
    else
    {
      navigate('/login');
    }
  }

  const handleHomePageOnClick = () =>
  {
    const accountPageContainer = document.querySelector(".accountPageContainer");
    accountPageContainer.classList.add("fade-out");
    setTimeout(()=>
    {
      navigate("/");
    }, 250)
  }
  return (
    <>

      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 className="homePageIcon" onClick={handleHomePageOnClick}>TypingTP</h1>
        <FaRegUser className="loginPageIcon" size={20} onClick={handleLoginPageOnClick}/>
      </div>

      <div className="accountPageContainer" style={{marginTop:"40px"}}>

        <FaRegCircleUser style={{marginLeft:"20px",alignSelf:"center"}} size={80} color="#939eae"/>
        <p style={{fontFamily:"monospace",fontSize: '3em', alignSelf:"center", marginLeft:"10px", color:"white", marginRight:"10px"}}>{username}</p>

        <span className="divider"/>

        <div style={{display:"flex", flexDirection:"column", margin:"auto"}}>
          <p className="typingTestsHeading">Tests Completed</p>
          <span className="typingTestValue">{tests}</span>
        </div>

        <span className="divider"/>

        <div style={{display:"flex", flexDirection:"column", margin:"auto"}}>
          <p className="typingTestsHeading">WPM</p>
          <span className="typingTestValue">{wpm}</span>
        </div>

      </div>
    </>
  )
}

export default AccountPage;