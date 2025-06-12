import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetials() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  if (!product) return <p>Loading....</p>;
  return (
    <div>
      <div className="section-wrapper" key={product.id}>
        <section className="profile">
          <h2>{product.title}</h2>
          <img
            className="avatar"
            src={product.image}
            alt="Maria Skłodowska-Curie"
            width={70}
            height={70}
          />
          <ul>
            <li>
              <b>price: </b>
              {product.price}
            </li>
            <li>
              <b>description: </b>
              {product.description}
            </li>
            <li>
              <b>category: </b>
              {product.category}
            </li>
            <li>
              <NavLink to="/products">
                <button> Back to Product Page</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <button onClick={() => dispatch(addToCart(product))}>
                  Add To Cart
                </button>
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ProductDetials;
