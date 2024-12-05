import React, { useEffect, useState } from 'react'

function HaldaTooteid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  function deleteProduct(productName) {
    fetch("http://localhost:8080/products/" + productName, {method: "DELETE"})
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
      <div>{products.length} tk</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => 
          <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.price} €</td>
            <td>{product.category?.name}</td>
            <td>
              <button onClick={() => deleteProduct(product.name)}>Kustuta</button>
              <button>Muuda</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default HaldaTooteid