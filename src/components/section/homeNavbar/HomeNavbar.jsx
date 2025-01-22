import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a
              href="#"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Start selling
            </a>
            <a
              href="tel:5541251234"
              class="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </a>
            <a
              href="#"
              class="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700 sm:hidden">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Watches
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Phones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Airpots
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-900 dark:text-white hover:underline"
                >
                  Electronics
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
