import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <h3 className="text-xl font-bold ">Login</h3>
        <p className="py-3">welcome back! Please Login</p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={FormData.email}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              value={FormData.passwor}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder=".............."
            />
          </div>
          <div className="flex items-start mb-5">
            <label
              htmlFor="terms"
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
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? "Singning in...." : "Sign in"}
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
