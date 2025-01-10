// rfce

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MuudaToode() {
  const {name} = useParams(); // URLst muutujate võtmiseks
  const [product, setProduct] = useState({});
  const nameRef = useRef();
  const priceRef = useRef();
  const activeRef = useRef();
  const stockRef = useRef();
  const categoryRef = useRef();
  const proteinsRef = useRef();
  const carbsRef = useRef();
  const fatsRef = useRef();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  // const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/product/" + name)
      .then(res => res.json())
      .then(json => setProduct(json));
  }, [name]); // <--- väline muutuja, kui see muutub, läheb uuesti useEffecti sisu tegema

  function change() {
  //   const newProduct = {
  //     "name": nameRef.current.value,
  //     "price": priceRef.current.value,
  //     // "active": activeRef.current.checked,
  //     // "stock": stockRef.current.value,
  //     // "category": {"id": categoryRef.current.value}
  // }
  const newProduct = {
        "name": nameRef.current.value,
        "price": priceRef.current.value,
        "active": activeRef.current.checked,
        "stock": stockRef.current.value,
        "category": {
            "id": categoryRef.current.value
        },
        "nutrients": {
            "proteins": proteinsRef.current.value,
            "carbohydrates": carbsRef.current.value,
            "fats": fatsRef.current.value
        }
    }

    fetch("http://localhost:8080/products", {
      method: "PUT",
      body: JSON.stringify(newProduct), 
      headers: {"Content-Type": "application/json"}
    })
      .then(res => res.json())
      .then(() => navigate("/halda-tooteid"));
  }
  
  return (
    <div>
      <label>Name</label> <br />
      <input type="text" ref={nameRef} defaultValue={product.name} /> <br />
      <label>Price</label> <br />
      <input type="text" ref={priceRef} defaultValue={product.price} /> <br />
      <label>Stock</label> <br />
      <input type="text" ref={stockRef} defaultValue={product.stock} /> <br />
      {/* <label>Category ID</label> <br />
      <input type="text" ref={categoryRef} defaultValue={product.category?.id} /> <br /> */}
      <br /><br />
      <FormControl style={{"width": "200px"}}>
        <InputLabel>Kategooria</InputLabel>
        <Select label="Kategooria" inputRef={categoryRef} defaultValue={1}>
          {/* <MenuItem value={1}>Karastus</MenuItem>
          <MenuItem value={2}>Piim</MenuItem>
          <MenuItem value={3}>Liha</MenuItem> */}
          {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </FormControl> <br /><br />
      <label>Proteins</label> <br />
      <input type="text" ref={proteinsRef} defaultValue={product.nutrients?.proteins} /> <br />
      <label>Carbs</label> <br />
      <input type="text" ref={carbsRef} defaultValue={product.nutrients?.carbohydrates} /> <br />
      <label>Fats</label> <br />
      <input type="text" ref={fatsRef} defaultValue={product.nutrients?.fats} /> <br />
      <label>Active</label> <br />
      <input type="checkbox" ref={activeRef} defaultChecked={product.active} /> <br />
      <Button variant="contained" onClick={change}>Muuda</Button>
    </div>
  )
}

export default MuudaToode