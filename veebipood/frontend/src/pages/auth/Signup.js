import { Button, FormControl, TextField } from '@mui/material'
import React, {  useContext, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthContext } from '../../store/AuthContext'
import { useNavigate } from 'react-router-dom'
 
function Signup() {
  const {t} = useTranslation()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const {setLoggedIn, setAdmin} = useContext(AuthContext);
  const navigate = useNavigate();
 
  const [message, setMessage] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
  })
 
  function signup() {
    const newPerson = {
      "email": emailRef.current.value,
      "firstName": firstNameRef.current.value,
      "lastName": lastNameRef.current.value,
      "password": passwordRef.current.value
    }
    fetch(process.env.REACT_APP_BACK_END_URL + "/signup", {
      method: "POST",
      body: JSON.stringify(newPerson),
      headers:{"Content-Type":"application/json"}})
    .then(res => res.json()
    .then(body => {
      console.log(body)
      if (body.message) {
        console.log(body)
        setMessage({
          firstNameError: firstNameRef.current.value.length < 3 ? "First name must be at least 3 characters" : "",
          lastNameError: lastNameRef.current.value.length < 3 ? "Last name must be at least 3 characters" : "",
          emailError: emailRef.current.value.length < 10 ? "Must be at least 10 characters or email is already in use": "",
          passwordError: passwordRef.current.value.length < 6 ? "Password has to be at least 6 characters": ""
        })
      } else {
        sessionStorage.setItem("token", body.token);
        sessionStorage.setItem("expiration", body.expiration);
        setLoggedIn(true);
        navigate("/profile");
        if (body.admin === true) {
          setAdmin(true);
        }
      }
    }))
  }
 
  return (
    <div>
      <br/>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"350px", margin:"auto"}}>
        <FormControl defaultValue="" required>
 
        <TextField
          required
          id="firstname-input"
          label={t("input-labels.firstname")}
          inputRef={firstNameRef}
          error={message.firstNameError !== ""}
          helperText={message.firstNameError !== "" ? message.firstNameError : ""}
        /> <br/>
        <TextField
          required
          id="lastname-input"
          label={t("input-labels.lastname")}
          inputRef={lastNameRef}
          error={message.lastNameError !== ""}
          helperText={message.lastNameError !== "" ? message.lastNameError : ""}
 
        /><br/>
        <TextField
          required
          id="email-input"
          label={t("input-labels.email")}
          inputRef={emailRef}
          error={message.emailError !== ""}
          helperText={message.emailError !== "" ? message.emailError : ""}
        /><br/>
        <TextField
          required
          id="password-input"
          label={t("input-labels.password")}
          type="password"
          inputRef={passwordRef}
          error={message.passwordError !== ""}
          helperText={message.passwordError !== "" ? message.passwordError: ""}
 
          autoComplete="current-password"
        />
        </FormControl> <br/>
        <Button variant="contained" onClick={() => signup()} style={{padding:"10px", width:"130px"}}>{t("nav.signup")}</Button>
 
      </div>
    </div>
  )
}
 
export default Signup