// front-endvite/src/components/ProductsList.jsx 
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status); 

  if (status === "loading") {
    return <p className="p-4">Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="p-4">No products yet</p>;
  } 

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> 
       {products.map((product) => {
  const discountPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <Link
      key={product._id}
      to={`/productOverview/${product._id}`}
    >
      <div className="border p-3 rounded hover:shadow-lg transition">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-60 object-cover"
        />

        <h3 className="mt-2 font-semibold">{product.title}</h3>

        <p className="text-gray-600 text-sm">
          {product.details?.slice(0, 25)}...
        </p>

        <p className="text-sm">
          Colors: {product.colors?.length}
        </p>

        <p className="font-semibold">₹{discountPrice}</p>

        {product.discount > 0 && (
          <p className="line-through text-gray-500">
            ₹{product.price}
          </p>
        )}
      </div>
    </Link>
  );
})}

      </div>
    </div>
  );
}

/* import { useSelector } from "react-redux";

export default function ProductsList() {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);

  if (status === "loading") {
    return <p className="p-4">Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="p-4">No products yet</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => {
          const discountPrice =
            product.price - (product.price * product.discount) / 100;

          return (
            <div
              key={product._id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
            >
              
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />

             
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

           
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 truncate">
                  {product.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1 truncate">
                  {product.details?.slice(0, 40)}...
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  Colors: <span className="font-medium">{product.colors?.length}</span>
                </p>

 
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-lg font-bold text-gray-900">₹{discountPrice}</p>
                  {product.discount > 0 && (
                    <p className="line-through text-gray-400 text-sm">₹{product.price}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
  */