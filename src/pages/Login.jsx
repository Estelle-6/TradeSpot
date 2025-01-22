import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <h3 className="text-xl font-bold ">Login</h3>
        <p className="py-3">welcome back! Please Login</p>

        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              for="email"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
          </div>
          <div class="flex items-start mb-5">
            <label
              for="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Or{" "}
              <Link to="/signup">
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign Up
                </a>
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
      <div className="flex-1">
        <img
          src="https://img.freepik.com/free-vector/maternity-care-products-abstract-concept-vector-illustration-maternity-special-products-healthy-natural-cosmetics-clean-care-goods-pregnant-newborn-skin-treatment-abstract-metaphor_335657-1609.jpg?uid=R183824320&ga=GA1.1.26106075.1737391570&semt=ais_incoming"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
