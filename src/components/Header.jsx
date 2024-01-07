import React from "react";
import { FaEthereum } from "react-icons/fa";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/blockchain";
import { truncate, useGlobalState } from "../store";

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <header
      className="flex justify-between items-center
  p-5 bg-white text-gray-500 hover:text-gray-700
  shadow-lg fixed top-0 left-0 right-0"
    >
      <Link
        to="/"
        href="#"
        className="flex justify-start items-center
      text-xl text-black space-x-1
      "
      >
        <span>Donations Dapp</span>
        <FaEthereum />
      </Link>
      <div className="flex space-x-2 justify-center">
        {connectedAccount ? (
          <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-450
        text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md
         hover:bg-blue-700 hover:text-white" onClick={ connectWallet}
        >
           {truncate(connectedAccount, 4, 4, 11)}
        </button>
        ) : (
          <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-450
        text-black font-medium text-xs leading-tight uppercase rounded-full shadow-md
         hover:bg-blue-700 hover:text-white" onClick={ connectWallet}
        >
          Connect Wallet
        </button>
        )} 
      </div>
    </header>
  );
};

export default Header;
