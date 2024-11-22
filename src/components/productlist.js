import { useNavigate } from "react-router-dom";
import products from "../assets/data/product.js"; // Adjust path if necessary

export function ProductList() {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    // Navigate to the ProductView page with the product ID
    navigate(`/product/${id}`);
  };
  const truncateName = (name, length = 20)=>{
    if(name.length > length){
      return name.substring(0, length) + "...";
    }
    return name;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={() => handleProductClick(product.id)} 
            >
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h2 className="text-base text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {truncateName(product.name)}
                    </a>
                  </h2>
                
                <button>Add to Cart</button>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-base font-medium text-gray-900">{product.price}</p>
                  <button className="mt-1 text-blue-500 hover:text-blue-700 font-bold">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
