import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// seda impordivad componendid / lehed läbi useContexti()
export const AuthContext = createContext();

// seda impordib index.js
export const AuthContextProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [admin, setAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      setLoggedIn(false);
      return;
    }
    fetch("http://localhost:8080/person?token=" + sessionStorage.getItem("token"))
      .then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.statusCode === undefined) {
          setLoggedIn(true);
          if (json.admin === true) {
            setAdmin(true);
          }
        } else {
          setLoggedIn(false);
        }
      })
  }, []);

  function logout() {
    setLoggedIn(false);
    setAdmin(false);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiration");
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, admin, setAdmin, logout}}>
      {children}
    </AuthContext.Provider>
  )
}