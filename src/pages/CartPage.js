import Menu from "../components/menu";

import { useParams } from "react-router-dom";

import { ProductView, Productviews } from "../components/Productviews";
import { ShoppingCart } from "../components/ShoppingCart";

export function CartPage() {


  return (
    <div>
      <Menu />
      <ShoppingCart/>
    </div>
  );
}
