import { createContext, useState } from "react";

export const CartSumContext = createContext();

// Contexti globaalsuse määratlemiseks
export const CartSumContextProvider = ({children}) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());
  const [cartCount, setCount] = useState(9); 
  // KODUS --> mitu tk ostukorvis on. näidata navbaris. 
  // muutub kui lisada 1 juurde ja võtta 1 vähemaks, tühjendamisel, kustutamisel jne

  function calculateCartSum() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let sum = 0;
    cart.forEach(cartProduct => sum += cartProduct.product.price * cartProduct.quantity)
    return sum;
  }

  const addCartSum = (increase) => {
    setCartSum(cartSum + increase);
  }

  const decreaseCartSum = (decrease) => {
    setCartSum(cartSum - decrease);
  }

  const emptyCart = () => {
    setCartSum(0);
  }

  return (
    <CartSumContext.Provider value={{cartSum, addCartSum, decreaseCartSum, emptyCart, cartCount, setCount}}>
      {children}
    </CartSumContext.Provider>
  )
}