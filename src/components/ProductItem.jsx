import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const truncateName = (name, length = 16) => {
    if (name.length > length) {
      return name.substring(0, length) + '...'
    }
    return name
  }
  return (
    <div
      className="group relative border-2 border-gray-200 pb-6 rounded-xl"
      // Chỉ chuyển trang khi click vào ảnh hoặc tên sản phẩm
      onClick={() => navigate(`/product/${props.id}`)}
    >
      <img
        alt={props.imageAlt}
        src={props.imageSrc}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-lg font-bold pl-2 text-gray-700">
            <a href={props.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {truncateName(props.name)}
            </a>
          </h2>
          <h3 className="text-base pl-2 text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {props.owner}
          </h3>
          {/* <button
            onClick={(event) => handleAddToCart(event, props)} // Ngăn sự kiện lan tỏa
            className="mt-2 w-full rounded-md bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700"
          >
            Add to Cart
          </button> */}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-lg pr-2 font-medium text-green-500">
            {props.price}
          </p>
          <button className="mt-1 mr-2 text-blue-500 hover:text-blue-700 font-bold">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductItem
