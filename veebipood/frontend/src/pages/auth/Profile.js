import { Button, TextField } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Profile() {
  const [person, setPerson] = useState({});
  const [message, setMessage] = useState("");
  const token = "Bearer " + sessionStorage.getItem("token");

  const getPerson = useCallback(() => {
    fetch("http://localhost:8080/person", {
      headers: {"Authorization": token}})
      .then(res => res.json())
      .then(json => {
        if (json.message && json.statusCode) {
          setMessage(json.statusCode + ": " + json.message);
        } else {
          setPerson(json);
        }
      })
  }, [token])

  useEffect(() => {
   getPerson();
  }, [getPerson]);

  const updateProfile = () => {
    fetch("http://localhost:8080/person", {
      method: "PUT",
      body: JSON.stringify(person),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then(res => res.json())
      .then(json => {
        if (json.message && json.statusCode) {
          toast.error(json.message);
        } else {
          toast.success("Edukalt uuendatud!");
        }
      })
  }

  return (
    <div>
      {/* <div>{JSON.stringify(person)}</div> */}
      <div>{message}</div>
      {message.startsWith("4") === false && 
      <>
        <TextField disabled inputlabel={{ shrink: true }} value={person.email || ""} label="Email" variant="outlined" /><br /><br />
        <TextField onChange={(e) => setPerson({...person, password: e.target.value})} inputlabel={{ shrink: true }} value={person.password || ""} label="Password" variant="outlined" /><br /><br />
        <TextField onChange={(e) => setPerson({...person, firstName: e.target.value})} inputlabel={{ shrink: true }} value={person.firstName || ""} label="First Name" variant="outlined" /><br /><br />
        <TextField onChange={(e) => setPerson({...person, lastName: e.target.value})} inputlabel={{ shrink: true }} value={person.lastName || ""} label="Last Name" variant="outlined" /><br /><br />
        <Button onClick={updateProfile}>Update Profile</Button>
      </>}
      <ToastContainer
          position="bottom-right"
          autoClose={4000}
          theme="dark"
      />
    </div>
  )
}

export default Profile