import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function HaldaTooteid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();

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

  function deleteProduct(productName) {
    fetch("http://localhost:8080/products/" + productName, {method: "DELETE"})
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  function updateProductCategory(productName) {
    fetch("http://localhost:8080/product-category?productName=" + 
        productName + "&categoryId=" + categoryRef.current.value, 
        {method: "PATCH"})
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  function decreaseStock(product) {
    fetch("http://localhost:8080/decrease-stock?name=" + product.name, {method: "PATCH"})
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  function increaseStock(product) {
    fetch("http://localhost:8080/increase-stock?name=" + product.name, {method: "PATCH"})
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
      <select ref={categoryRef}>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <div>{products.length} tk</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Nutrients</th>
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
              <Button onClick={() => decreaseStock(product)} variant="danger">-</Button>
              {product.stock}
              <Button onClick={() => increaseStock(product)} variant="success">+</Button>
            </td>
            <td>{product.active + 0}</td>
            <td>
              {product.nutrients?.proteins} |
              {product.nutrients?.carbohydrates} |
              {product.nutrients?.fats}
              </td>
            <td>
              <button onClick={() => deleteProduct(product.name)}>Kustuta</button>
              <button onClick={() => updateProductCategory(product.name)}>Muuda kategooria (väärtus dropdownist)</button>
              <Link to={"/muuda-toode/" + product.name}>
                <button>Muuda teisi väärtusi (eraldi lehel)</button>
              </Link>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default HaldaTooteid