import { Button, TextField } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Kui suunamine toimub JavaScripti poole peal
  const {setLoggedIn, setAdmin} = useContext(AuthContext);

  function login() {
    const payload = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value
    }

    fetch(process.env.REACT_APP_BACK_END_URL + "/login", {
      "method": "POST",
      "body": JSON.stringify(payload),
      "headers": {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()) // mida tagastab back-end.
      .then(body => {
        console.log(body);
        if (body.message && body.statusCode) {
          // console.log(body.message);
          // setMessage(body.message);
          determineErrorMessage(body.message);
        } else {
          navigate("/profile");
          sessionStorage.setItem("token", body.token);
          sessionStorage.setItem("expiration", body.expiration);
          setLoggedIn(true);
          if (body.admin === true) {
            setAdmin(true);
          }
        }
      });
  }

  function determineErrorMessage(backendMessage) {
    switch(backendMessage) {
      case "EMAIL_WRONG_ERROR": 
        setMessage("E-mail is not correct");
        break;
      case "PASSWORD_WRONG_ERROR": 
        setMessage("Password is not correct");
        break;
      default: 
        setMessage("Unknown error");
        break;
    }
  }

  return (
    <div>
      <div>{message}</div>
      <TextField inputRef={emailRef} label="Email" variant="outlined" /><br /><br />
      <TextField inputRef={passwordRef} label="Password" variant="outlined" /><br /><br />
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default Login