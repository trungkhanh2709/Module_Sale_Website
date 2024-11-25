import Menu from '../components/menu'

import { useParams } from 'react-router-dom'

import { ProductView, Productviews } from '../components/ProductView'

export function ProductDetail() {
  const { id } = useParams()

  return (
    <div>
      <Menu />
      <ProductView id={id} />
    </div>
  )
}
