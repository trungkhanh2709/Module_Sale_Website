import Menu from "../components/menu"
import {Card} from "../components/card"
import { useState } from "react";

import { ProductList } from "../components/productlist"
import { ProductView, Productviews } from "../components/Productviews"

export function ProductPage(){
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleProductClick = (id) => {
      setSelectedProductId(id);
      // Here you can navigate to another component or show details based on the selected product id
      console.log("Selected product ID:", id);
    };
    return(
       <div>
            <Menu/>
            <ProductList onProductClick={handleProductClick} />            
            {selectedProductId && <ProductView productId={selectedProductId} />}

       </div> 
    )
}