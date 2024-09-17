import TypingText from "./components/TypingText.jsx"
import "./index.css"
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./GlobalState.jsx";
import { useContext } from "react";

function HomePage()
{
  const {isLoggedIn} = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLoginPageOnClick = () =>
  {
    const typingTextContainer = document.querySelector(".typingTextContainer");
    typingTextContainer.classList.add("fade-out");
    setTimeout(() =>
    {
      if(isLoggedIn)
      {
        navigate("/account");
      }
      else
      {
        navigate('/login');
      }
    }, 250);
  }

  const handleHomePageOnClick = () =>
  {
    navigate("/");
  }

  return (
    <>
      
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 className="homePageIcon" onClick={handleHomePageOnClick}>TypingTP</h1>
        <FaRegUser className="loginPageIcon" size={20} onClick={handleLoginPageOnClick}/>
      </div>

      <div className="typingTextContainer">
        <TypingText/>
      </div>
      
    </>
  )
}

export default HomePage;