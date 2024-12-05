import React from 'react'
import { useEffect, useState } from 'react';

function Avaleht() {
  // on võimalik HTMLs muudatusi teha
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // onLoad funktsioon
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  function productsByCategory(categoryId) {
    fetch("http://localhost:8080/products-by-category/" + categoryId)
      .then(res => res.json())
      .then(json => setProducts(json));
  } 

  function allProducts() {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
       {/* .map on tsükkel, käies läbi kõik array elemendid ja tehes
      igaühe kohta HTML lõigu */}
      <button onClick={() => allProducts()}>Kõik tooted</button>
      {categories.map(category => <button key={category.id} onClick={() => productsByCategory(category.id)}>{category.name}</button>)}

      <div>{products.length} tk</div>
      {products.map(product => 
        <div key={product.name}>
          <div>{product.name}</div>
          <div>{product.price} €</div>
          <div>{product.category?.name}</div>
        </div>)}
    </div>
  )
}

export default Avaleht