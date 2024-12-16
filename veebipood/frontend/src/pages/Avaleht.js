import React from 'react'
import { useEffect, useState } from 'react';

function Avaleht() {
  // on võimalik HTMLs muudatusi teha
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // onLoad funktsioon
  useEffect(() => {
    fetch("http://localhost:8080/public-products")
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

        {/* <button><-</button>
        <button>1</button>
        <button>2</button>
        <button>-></button> */}
        {/* Leheküljenumbrid */}
    </div>
  )
}

export default Avaleht



// https://fakestoreapi.com/products   ---> juba tehtud
// https://api.itbook.store/1.0/search/angular   ---> juba tehtud
// https://dashboard.elering.ee/api/nps/price    ---> juba tehtud
// https://www.freetestapi.com/api/v1/books 
// https://www.freetestapi.com/api/v1/countries 
// https://marineregions.org/rest/getGazetteerTypes.json 
// https://environment.data.gov.uk/flood-monitoring/id/floods 
// https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100
