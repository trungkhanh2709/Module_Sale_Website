import React, { useState } from "react";
import products from "../assets/data/product.js";
import "../style/card.css";
import { ReactComponent as HeartIcon } from "../assets/svg/heart-regular.svg";
import { ReactComponent as CartPlus } from "../assets/svg/cart-plus-solid.svg";

const useLike = () => {
  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (id) => {
      setLikedProducts((prev) => ({
          ...prev,
          [id]: !prev[id], // Đảo ngược trạng thái yêu thích
      }));
  };

  return [likedProducts, toggleLike];
};

export function Card() {
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };
  const [likedProducts, toggleLike] = useLike();
 

  const productList = products.map((product) => {
    const isLiked = likedProducts[product.id]; // Kiểm tra xem sản phẩm có được yêu thích không

    return (

      
      <div className="card-item">
        <a href="" className="card_a_item button_text">
          <li key={product.id} className="listCard">
            <img
              className="logo"
              src={require(`../assets/image/${product.id}.jpg`)}
              alt={product.name}
            />
            <p className="product-name">{truncateText(product.name, 20)}</p>
            <div className="infor-card">
              <p>By {truncateText(product.name, 10)}</p>
              <p className="product_price">${product.price}</p>
            </div>

            <div className="cart_and_heart_icon">
             
                <a href="" className="button_text add-to-card-button">Add to cart
                <CartPlus className="cart_plus" />
            
                </a>

              <div className="heart-icon">
              <a href="#" onClick={(e) => { e.preventDefault(); toggleLike(product.id); }}>
                  <HeartIcon className="HeartIcon"  style={{ fill: isLiked ? "red" : "" }} />
                </a>
              </div>
            </div>
          </li>
        </a>
      </div>
    );
  });

  return <div className="card-container">{productList}</div>;
}
