import Menu from '../components/menu'
import { useState } from 'react'

import { ProductList } from '../components/ProductList'
import { ProductView, Productviews } from '../components/ProductView'

export function ProductPage() {
  const [selectedProductId, setSelectedProductId] = useState(null)

  const handleProductClick = (id) => {
    setSelectedProductId(id)
  }
  return (
    <div>
      <Menu />
      <ProductList onProductClick={handleProductClick} />
      {selectedProductId && <ProductView productId={selectedProductId} />}
    </div>
  )
}
