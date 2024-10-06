
import React from "react";
import products from "../assets/data/product.js";
import "../style/card.css";

export function Card() {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  const productList = products.map((product) => {
    return (
      <div className="card-item">
        <a href="">
        <li key={product.id} className="listCard">
          <img
            className="logo"
            src={require(`../assets/image/${product.id}.jpg`)}
            alt={product.name}
          />
          <p className="product-name">{truncateText(product.name,20) }</p>
          <p>By {product.owner}</p>
          <p>${product.price}</p>
     
          <a href="" className="add-to-card-button">Add to cart</a> 
        </li>
        </a>
      
      </div>
    );
  });

  return (
    <div className="card-container">
     {productList}
    </div>
  );
}
