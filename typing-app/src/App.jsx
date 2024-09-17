import "./components/style.css"
import "./index.css"
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./GlobalState.jsx";
import AccountPage from "./AccountPage.jsx";

function App()
{
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/account" element={<AccountPage/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}



export default App;