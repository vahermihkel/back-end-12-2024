import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

function LisaToode() {
  const nameRef = useRef(); // HTMLi inputist andmeid kätte
  const priceRef = useRef(); 
  const stockRef = useRef(); 
  const activeRef = useRef(); 
  const categoryRef = useRef(); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  function addProduct() {
    const newProduct = {
      "name": nameRef.current.value,
      "price": priceRef.current.value,
      "active": activeRef.current.checked,
      "stock": stockRef.current.value,
      "category": {"id": categoryRef.current.value}
  }

    fetch("http://localhost:8080/products", {
      method: "POST", 
      body: JSON.stringify(newProduct), 
      headers: {"Content-Type": "application/json"}
    })
      .then(res => res.json())
      .then(() => {
        nameRef.current.value = "";
        priceRef.current.value = "";
        activeRef.current.value = true;
        stockRef.current.value = "";
        categoryRef.current.value = "";
      });
  }

  // 400 -> bad request. IntelliJ console
  // 405 -> POST koos URL-ga
  // 415 -> Content-Type       Media ei ole sobiv

  return (
    <div>
      <br />
      <TextField inputRef={nameRef} label="Nimi" variant="outlined" /><br /><br />
      <TextField inputRef={priceRef} label="Hind" variant="outlined" /><br /><br />
      <TextField inputRef={stockRef} label="Laokogus" variant="outlined" /><br /><br />
      <FormControlLabel control={<Checkbox inputRef={activeRef} defaultChecked />} label="Aktiivne" /> <br /><br />
      {/* <TextField inputRef={categoryRef} label="Ajutine: Kategooria ID" variant="outlined" /><br /><br /> */}

      <FormControl style={{"width": "200px"}}>
        <InputLabel>Kategooria</InputLabel>
        <Select label="Kategooria" inputRef={categoryRef} defaultValue={1}>
          {/* <MenuItem value={1}>Karastus</MenuItem>
          <MenuItem value={2}>Piim</MenuItem>
          <MenuItem value={3}>Liha</MenuItem> */}
          {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </FormControl>
      <br /><br />

      <Button onClick={() => addProduct()} variant="contained">Lisa</Button>
    </div>
  )
}

export default LisaToode