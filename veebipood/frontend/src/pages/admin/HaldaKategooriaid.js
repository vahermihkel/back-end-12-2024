import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Button as BButton } from 'react-bootstrap';
 
// Võta siia lehele kõik kategooriad .example halda tooted + 
// Võimalda siin lehel ühte kategooriat kustutuda + 
// Võimalda siin lehel ühte kategooriat lisada + 
 
////////////////////////////
// Error handling: Kui Ei saa kategooriat kustutada, sest see on kasutuses
function HaldaKategooriaid() {
  const categoryName = useRef()
  const [categories, setCategories] = useState([])
  const [openWindow, setOpenWindow] = useState(false)
 
  useEffect(() => {
    fetch("http://localhost:8080/categories")
    .then(res => res.json())
    .then(json => setCategories(json))
  }, []);
 
  function deleteCategoryById(id) {
    fetch("http://localhost:8080/categories/" + id, {method:"DELETE"})
    .then(res => res.json())
    .then(json => setCategories(json))
    .catch((err) => {
      console.log("Error:", err)
      alert(`Error: ${err.message}`)
    })
  }
 
  function openNewCategoryWindow() {
    setOpenWindow(true);
  }
 
  function closeNewCategoryWindow() {
    setOpenWindow(false);
  }
 
  function addNewCategory() {
    const addCategory = {
      "name": categoryName.current.value
    }
 
    fetch("http://localhost:8080/categories", {
      method:"POST",
      body: JSON.stringify(addCategory),
      headers:{"Content-Type":"application/json"}})
    .then(res => res.json())
    .then(() => {
      categoryName.current.value = ""
        fetch("http://localhost:8080/categories")
        .then(res => res.json())
        .then(json => setCategories(json))
    })  
    closeNewCategoryWindow()
 
  }
 
  return (
    <div>
      <table>
          <thead>
              <tr>
                  <th>Category</th>
              </tr>
          </thead>
          <tbody>
          {categories.map(category => 
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                    <BButton variant='danger' onClick={() => deleteCategoryById(category.id)}>X</BButton>
                </td>
              </tr>)}
          </tbody>
      </table>
      <div>
      <Button variant='contained' onClick={() => openNewCategoryWindow()}>Lisa Uus Kategooria</Button>
      </div>
      <div>
        <Dialog open={openWindow} onClose={() => closeNewCategoryWindow}>
          <DialogTitle>Lisa Kategooria</DialogTitle>
          <DialogContent>
            <TextField inputRef={categoryName} label="Kategooria nimi" fullWidth margin="normal"/>
          </DialogContent>
          <DialogActions>
          <Button onClick={closeNewCategoryWindow} color="secondary">Tagasi</Button>
          <Button onClick={() => addNewCategory()} color="primary">Lisa</Button>
          </DialogActions>
        </Dialog>
 
      </div>
  </div>
  )
}
 
export default HaldaKategooriaid