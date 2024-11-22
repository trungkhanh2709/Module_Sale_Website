import Menu from "../components/menu";

import { useParams } from "react-router-dom";

import { ProductView, Productviews } from "../components/Productviews";

export function ProductDetail() {
  const { id } = useParams();

  return (
    <div>
      <Menu />
      <ProductView id={id} />
    </div>
  );
}
