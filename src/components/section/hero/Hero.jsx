import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="max-h-full flex justify-center items-center align-middle mt-0">
      <div className="h-full">
        <h1 className="text-4xl font-bold">Your best selling platform</h1>
        <p className="text-base text-left my-3">
          get your product open to a much wider audience
        </p>
        <Link to="/signup">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
        </Link>
      </div>
      <div className="flex-1">
        <img
          src="https://img.freepik.com/free-vector/shopping-sprees-video-abstract-concept-illustration_335657-1865.jpg?semt=ais_incoming"
          alt="hero image"
        />
      </div>
    </div>
  );
};

export default Hero;
