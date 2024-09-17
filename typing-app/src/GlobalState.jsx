import React, {Children, createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) =>
{
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{username, setUsername, isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
}