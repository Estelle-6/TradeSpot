// components/PurchaseSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";

const PurchaseSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Purchase Successful!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-gray-600">
            Please wait for 48 hours and your goods will be delivered.
          </p>
          <Link to="/home">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
