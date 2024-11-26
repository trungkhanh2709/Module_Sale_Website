import { useNavigate } from 'react-router-dom'
import products from '../assets/data/product.js' // Adjust path if necessary
import React, { useState } from 'react'
import ProductItem from './ProductItem.jsx'

export function ProductList() {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductItem
              id={product.id}
              name={product.name}
              key={product.id}
              imageAlt={product.imageAlt}
              imageSrc={product.imageSrc}
              href={product.href}
              owner={product.owner}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

