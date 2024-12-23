import React from 'react'
import { useEffect, useState } from 'react';

function Avaleht() {
  // on võimalik HTMLs muudatusi teha
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const pageSize = 2;

  // onLoad funktsioon
  useEffect(() => {
    fetch("http://localhost:8080/public-products?page=0&size=" + pageSize)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content);
        const numbers = [];
        for (let number = 1; number <= json.totalPages; number++) {
          numbers.push(number);
        }
        setPageNumbers(numbers);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  function productsByCategory(categoryId) {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetch("http://localhost:8080/products-by-category/" + categoryId + "?page=0&size=" + pageSize)
    .then(res => res.json())
    .then(json => {
      setProducts(json.content);
      const numbers = [];
      for (let number = 1; number <= json.totalPages; number++) {
        numbers.push(number);
      }
      setPageNumbers(numbers);
    });
  } 

  function allProducts() {
    setSelectedCategory(-1);
    setCurrentPage(1);
    fetch("http://localhost:8080/public-products?page=0&size=" + pageSize)
    .then(res => res.json())
    .then(json => {
      setProducts(json.content);
      const numbers = [];
      for (let number = 1; number <= json.totalPages; number++) {
        numbers.push(number);
      }
      setPageNumbers(numbers);
    });
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    if (selectedCategory === -1) {
      fetch("http://localhost:8080/public-products?page=" + (pageNumber-1) +"&size=" + pageSize)
      .then(res => res.json())
      .then(json => {
        setProducts(json.content);
        const numbers = [];
        for (let number = 1; number <= json.totalPages; number++) {
          numbers.push(number);
        }
        setPageNumbers(numbers);
      });
    } else {
      fetch("http://localhost:8080/products-by-category/" + selectedCategory + "?page=" + (pageNumber-1) +"&size=" + pageSize)
        .then(res => res.json())
        .then(json => {
          setProducts(json.content);
          const numbers = [];
          for (let number = 1; number <= json.totalPages; number++) {
            numbers.push(number);
          }
          setPageNumbers(numbers);
        });
    }
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

        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
                  <span onClick={() => paginate(number)} className="page-link"> {number} </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

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
