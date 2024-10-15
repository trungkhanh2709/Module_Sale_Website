import React, { useState } from "react";
import "../style/menu.css";
import products from "../assets/data/product"; 
import logoImage from "../assets/svg/menuLogo.svg"

export function Menu() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    // Filter products as the user types
    if (input.trim() !== "") {
      const searchTerm = input.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleKeyPress = (e) => {
        if (e.key === "Enter") {
          const searchTerm = searchInput.toLowerCase();
          if (searchTerm.trim() !== "") {
            const filtered = products.filter((product) =>
              product.name.toLowerCase().includes(searchTerm)
            );
            setFilteredProducts(filtered);
          } else {
            setFilteredProducts([]);
          }
        }
    }

  return (
    <div>
      <nav id="menu-header">
        <img className="logo_menu" src= {logoImage}></img>
        <ul id="menu-ul-header">
          <li className="menu-li-header">
            <a href="" className="menu-a-header">Home</a>
          </li>
          <li className="menu-li-header">
            <a href="" className="menu-a-header">Product</a>
          </li>
          <li className="menu-li-header">
            <a href="" className="menu-a-header">Contact</a>
          </li>
          <li className="menu-li-header">
            <a href="" className="menu-a-header">About us</a>
          </li>
        </ul>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            id="Search_Bar"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          {filteredProducts.length > 0 && (
            <div className="suggestions">
              <ul>
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <a href="" className="a_suggestion">
                      {product.name} - ${product.price.toFixed(2)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {searchInput.trim() !== "" && filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found.</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Menu;