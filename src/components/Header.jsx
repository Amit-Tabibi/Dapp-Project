import React from "react";
import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="flex justify-between items-center
  p-5 bg-white text-green-500 hover:text-gray-700
  shadow-lg fixed top-0 left-0 right-0"
    >
      <Link
        to="/"
        href="#"
        className="flex justify-start items-center
      text-xl text-black space-x-1
      "
      >
        <span>Dapp</span>
        <FaEthereum />
      </Link>
      <div className="flex space-x-2 justify-center">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-400
        text-black font-meduim text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:text-white"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header;
