import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductPage} from "../src/pages/Product"
import {ProductView} from "./components/Productviews"; 
import {ShoppingCart} from "./components/ShoppingCart"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductView />} />
      </Routes>
    </Router>

   
  );
}

export default App;
