import { Button } from '@mui/material';
import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { CartSumContext } from '../store/CartSumContext';

function Avaleht() {
  // on võimalik HTMLs muudatusi teha
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const pageSize = 2;
  const {addCartSum} = useContext(CartSumContext);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      });
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

  function addToCart(productClicked) {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cartLS.find(cartProduct => cartProduct.product.name === productClicked.name);
    if (product !== undefined) {
      product.quantity++;
    } else {
      cartLS.push({product: productClicked, quantity: 1});
    }
    localStorage.setItem("cart", JSON.stringify(cartLS));
    //setCartSum(cartSum + productClicked.price);
    addCartSum(productClicked.price);
  }

  // 1. vaja võtta localStorage-st kõik varasemad ostukorvitooted (localstorage.getItem)
  // 2. vaja võtta jutumärgid maha, sest storage-s on kõik stringina (JSON.parse)
  // 3. vaja lisada toode juurde (.push)
  // 4. vaja panna jutumärgid tagasi, sest stringina kõik (JSON.stringify)
  // 5. vaja panna localStorage-sse tagasi kõik uuenenud tooted (localStorage.setItem)

  // tegelikult võiks olla boolean isLoading, setLoading = useState
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
       {/* .map on tsükkel, käies läbi kõik array elemendid ja tehes
      igaühe kohta HTML lõigu */}
      <Button variant="outlined" onClick={() => allProducts()}>Kõik tooted</Button>
      {categories.map(category => <Button key={category.id} onClick={() => productsByCategory(category.id)}>{category.name}</Button>)}

      <div>{products.length} tk</div>
      {products.map(product => 
        <div key={product.name}>
          <div>{product.name}</div>
          <div>{product.price} €</div>
          <div>{product.category?.name}</div>
          <Button variant='contained' onClick={() => addToCart(product)}>Lisa ostukorvi</Button>
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
