import "./components/style.css"
import "./index.css"
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FaRegUser } from "react-icons/fa";

function App()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;