import { Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartSumContext } from '../store/CartSumContext';

function Ostukorv() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const {addCartSum, decreaseCartSum, emptyCart} = useContext(CartSumContext);

  function tyhjenda() {
    setCart([]);
    localStorage.setItem("cart", "[]");
    emptyCart();
  }

  function decreaseQuantity(cartProduct) {
    cartProduct.quantity--;
    if (cartProduct.quantity === 0) {
      remove(cartProduct);
    }
    setCart(cart.slice());  // HTMLi muutmiseks
    localStorage.setItem("cart", JSON.stringify(cart)); // salvestuseks
    decreaseCartSum(cartProduct.product.price);
  }

  function increaseQuantity(cartProduct) {
    cartProduct.quantity++;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    addCartSum(cartProduct.product.price);
  }

  function remove(cartProduct) {
    const index = cart.indexOf(cartProduct);
    cart.splice(index,1);
    setCart(cart.slice()); // .slice ---> mälukoha kustutamiseks
    localStorage.setItem("cart", JSON.stringify(cart));
    decreaseCartSum(cartProduct.product.price * cartProduct.quantity);
  }

  function addOrder() {
    fetch(process.env.REACT_APP_BACK_END_URL + "/orders", {
      method: "POST", 
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(json => window.location.href = json.link);
  }

  function calculateCartSum() {
    let sum = 0;
    cart.forEach(cartProduct => sum += cartProduct.product.price * cartProduct.quantity)
    return sum;
  }

  return (
    <div>
      {cart.length === 0 && <div>Ostukorv on tühi</div>}

      {cart.length > 0 && <Button onClick={tyhjenda}>Tühjenda</Button>}
      {cart.map(cartProduct => 
        <div className="product">
          <div className="name">{cartProduct.product.name}</div>
          <div className="price">{cartProduct.product.price.toFixed(2)} €</div>
          <div className="quantity">
            <img className="icon" onClick={() => decreaseQuantity(cartProduct)} src="/minus.png" alt="" />
            <div>{cartProduct.quantity} pcs</div>
            <img className="icon" onClick={() => increaseQuantity(cartProduct)} src="/plus.png" alt="" />
          </div>
          <div className="total">{(cartProduct.product.price * cartProduct.quantity).toFixed(2)}€</div>
          <img className="icon" onClick={() => remove(cartProduct)} src="/remove.png" alt="" />
        </div>)}
       {cart.length > 0 &&
        <>
          <div>{calculateCartSum().toFixed(2)}</div>
          {sessionStorage.getItem("token") !== null ? 
            <Button variant="contained" onClick={addOrder}>Telli</Button> :
            <Link to="/login">
              <Button variant="outlined">Logi sisse</Button>  
            </Link>
          }
        </>}
    </div>
  )
}

// onClick={() => remove(index)}
// onClick={addOrder}
// xxxxxx  onClick={funkts()}   <--- siis kutsub kohe, ilma klikkimata välja
// <div>{calculateSum()}</div>

export default Ostukorv