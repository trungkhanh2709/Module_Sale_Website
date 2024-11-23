import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductPage} from "../src/pages/Product"
import {ProductView} from "./components/Productviews";
import { ProductDetail } from "./pages/ProductDetail"; 
import {ShoppingCart} from "./components/ShoppingCart";
import { CartProvider } from "./context/CartContext";
import { CartPage } from "./pages/CartPage";
function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>


   
  );
}

export default App;
