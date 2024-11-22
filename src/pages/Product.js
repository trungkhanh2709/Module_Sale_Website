import Menu from "../components/menu";
import { Card } from "../components/card";
import { useState } from "react";

import { ProductList } from "../components/productlist";
import { ProductView, Productviews } from "../components/Productviews";

export function ProductPage() {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };
  return (
    <div>
      <Menu />
      <ProductList onProductClick={handleProductClick} />
      {selectedProductId && <ProductView productId={selectedProductId} />}
    </div>
  );
}
