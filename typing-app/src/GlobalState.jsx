import React, {Children, createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>
{
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userTypingDetails, setUserTypingDetails] = useState({tests: 0, wpm : 0});
  return (
    <UserContext.Provider value={{username, setUsername, isLoggedIn, setIsLoggedIn, userTypingDetails, setUserTypingDetails}}>
      {children}
    </UserContext.Provider>
  );
}