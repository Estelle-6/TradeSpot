import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //validate form fields
  const validateForm = () => {
    let formErrors = {};
    if (!formData.username.trim())
      formErrors.username = "Username is required.";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post(
        "https://example.com/api/register",
        formData
      );
      console.log(response.data);
      setSuccessMessage("Registration successful!");
      setFormData({ username: "", email: "", password: "" }); // Reset form
      setErrors({});
    } catch (error) {
      console.error("Error during registration:", error.response.data);
      setErrors({
        apiError: error.response.data.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <h3 className="text-xl font-bold ">Create your account</h3>
        <p className="py-3">welcome! please enter your details</p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              name="username"
              type="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Enter your name"
              required
            />
            {errors.username && (
              <p className="text-red-50">{errors.username}</p>
            )}
          </div>
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
              value={formData.email}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
            {errors.email && <p className="text-red-50">{errors.email}</p>}
          </div>
          <div class="mb-5">
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
              value={formData.password}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {errors.password && (
              <p className="text-red-50">{errors.password}</p>
            )}
          </div>
          <div class="mb-5">
            <label
              for="repeat-password"
              className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Repeat password
            </label>
            <input
              name="password"
              type="password"
              id="repeat-password"
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
              <Link to="/login">
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Sign In
                </a>
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
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

export default SignUp;
