import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/section/homeNavbar/HomeNavbar";
import ProductCart from "../components/cards/productCard/ProductCart";
import { productAPI } from "../services/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   productAPI
  //     .getAll()
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error("Error fetching products:", err))
  //     .finally(/*() => setLoading(false)*/);
  // }, []);

  useEffect(() => {
    setLoading(true);
    productAPI
      .getAll()
      .then((res) => {
        // Format the products data to ensure images are handled correctly
        const formattedProducts = res.data.map((product) => ({
          ...product,
          // Handle cases where images might be a string or array
          images: Array.isArray(product.images)
            ? product.images
            : product.image_url
            ? [product.image_url]
            : [],
        }));
        setProducts(formattedProducts);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("products: ", products);

  const defaultImage =
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyfGVufDB8fDB8fHww";

  return (
    <div>
      <HomeNavbar />
      <form className="flex items-center max-w-sm mx-auto mt-20">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div className="flex relative">
        <div className="text-left hidden gap-4 sm:block">
          <h4 className="font-bold">Categories</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="">Electronic</a>
            </li>
            <li>
              <a href="">dresses</a>
            </li>
            <li>
              <a href="">food</a>
            </li>
          </ul>
        </div>
        <div className="flex-1 mx-auto px-4 py-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  gap-4">
            {products.map((product) => (
              <ProductCart
                key={product.id}
                productId={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={ product.image_urls[0] || defaultImage} // Try both formats
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
