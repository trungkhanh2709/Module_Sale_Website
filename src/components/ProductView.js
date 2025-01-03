import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // To get the URL parameter
import products from '../assets/data/product.js' // Adjust path if necessary
import loader from '../assets/svg/loader.svg'
import Popup from './Popup.jsx'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function ProductView({ id: propId }) {
  const { id: routeId } = useParams() // Get id from URL
  const id = propId || routeId
  const [product, setProduct] = useState(null)
  const [cartMessage, setCartMessage] = useState('') // State to show cart message
  // Fetch the product data based on the productId
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id)
    setProduct(foundProduct)
  }, [id])

  // Function to handle adding product to cart
  const handleAddToCart = (event) => {
    event.preventDefault()

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    const isProductInCart = currentCart.some((item) => item.id === product.id)

    if (isProductInCart) {
      alert(`${product.name} is already in the cart.`)
    } else {
      currentCart.push(product)
      localStorage.setItem('cart', JSON.stringify(currentCart))

      const cartUpdateEvent = new CustomEvent('cartUpdate', {
        detail: { cartCount: currentCart.length },
      })
      window.dispatchEvent(cartUpdateEvent)

      alert(`${product.name} has been added to the cart!`)
    }

    setTimeout(() => {
      setCartMessage('')
    }, 5000)
  }

  const [isOpen, setIsOpen] = useState(false)
  const openPopup = (event) => {
    event.preventDefault()
    setIsOpen(true)
  }
  const closePopup = () => {
    setIsOpen(false)
  }

  if (!product) return <img src={loader} alt="Loading..." />

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
          />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img
              alt={product.images[0].alt}
              src={product.images[0].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
            <img
              alt={product.images[1].alt}
              src={product.images[1].src}
              className="aspect-[3/2] size-full rounded-lg object-cover"
            />
          </div>
          <img
            alt={product.images[2].alt}
            src={product.images[2].src}
            className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
          />
        </div>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>

            <form className="mt-10" onSubmit={handleAddToCart}>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>
            {/* -------------------------------------------------- */}
            {/* Thanh toán hiển thị Popup */}
            <button
              onClick={openPopup}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Thanh toán
            </button>
            <Popup isOpen={isOpen} closePopup={closePopup} />
            {/* -------------------------------------------------- */}
            {/* Cart Message */}
            {cartMessage && (
              <div className="mt-4 text-green-600 text-sm">{cartMessage}</div>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
