import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

function HaldaTooteid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_BACK_END_URL + "/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_BACK_END_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  function updateProductCategory(productName) {
    fetch(process.env.REACT_APP_BACK_END_URL + "/product-category?productName=" + 
        productName + "&categoryId=" + categoryRef.current.value, 
        {
          method: "PATCH",
          headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
        })
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  function decreaseStock(product) {
    fetch(process.env.REACT_APP_BACK_END_URL + "/decrease-stock?name=" + product.name, {
      method: "PATCH",
      headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
    })
      .then(res => res.json())
      .then(json => {
        if (json.message && json.statusCode) {
          // setMessage(json.message);
          toast.error(json.message);
        } else {
          setProducts(json);
        }
      });
  }

  function increaseStock(product) {
    fetch(process.env.REACT_APP_BACK_END_URL + "/increase-stock?name=" + product.name, {
      method: "PATCH",
      headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
    })
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  function changeProductActive(product) {
    const newActive = !product.active;
    fetch(process.env.REACT_APP_BACK_END_URL + "/change-active?productName=" + product.name + "&active=" + newActive, {
      method: "PATCH",
      headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")}
    })
      .then(res => res.json())
      .then(json => setProducts(json));
  }

  return (
    <div>
      <div>{message}</div>
      <select ref={categoryRef}>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <div>{products.length} tk</div>
      <table>
        <thead>
          <tr>
            <th>{t("product.name")}</th>
            <th>{t("product.price")}</th>
            <th>{t("product.category")}</th>
            <th>{t("product.stock")}</th>
            <th>{t("product.active")}</th>
            <th>{t("product.nutrients")}</th>
            <th>{t("table.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => 
          <tr key={product.name} className={product.active ? "active" : "inactive"}>
            <td>{product.name}</td>
            <td>{product.price} €</td>
            <td>{product.category?.name}</td>
            <td className="stock">
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
              <button onClick={() => changeProductActive(product)}>Muuda {!product.active ? "aktiivseks": "mitteaktiivseks"}</button>
              <button onClick={() => updateProductCategory(product.name)}>Muuda kategooria (väärtus dropdownist)</button>
              <Link to={"/muuda-toode/" + product.name}>
                <button>Muuda teisi väärtusi (eraldi lehel)</button>
              </Link>
            </td>
          </tr>)}
        </tbody>
      </table>

      <ToastContainer
                position="bottom-right"
                autoClose={4000}
                theme="dark"
            />
    </div>
  )
}

export default HaldaTooteid