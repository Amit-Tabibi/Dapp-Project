import React from "react";
import Campaigns from "../components/Campaigns";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <Campaigns />
      <div className="flex justify-center items-center my-5">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-400
        text-white font-meduim text-xs leading-tight uppercase 
        rounded-full shadow-md hover:bg-blue-700 hover:text-white"
        >
          Load More Campaigns
        </button>
      </div>
    </>
  );
};

export default Home;
