import { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'; // Import icon Trash

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Lấy dữ liệu từ localStorage khi component được render
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    const cartUpdateEvent = new CustomEvent('cartUpdate', {
      detail: { cartCount: updatedCart.length },
    });
    window.dispatchEvent(cartUpdateEvent);
  };
  

  // Xử lý checkbox chọn sản phẩm
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id) 
        : [...prevSelected, id] 
    );
  };

  // Tính tổng giá cho các sản phẩm đã chọn
  const calculateTotal = () =>
    cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-4"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
              <img src={item.imageSrc} alt={item.imageAlt} className="h-16 w-16 rounded mr-4" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          ))}
          <div className="mt-4 border-t pt-4">
            <p className="text-lg font-bold">
              Selected Total: ${calculateTotal().toFixed(2)}
            </p>
            <button
              className="mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              disabled={selectedItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
