import React, { useEffect } from "react";
import Campaigns from "../components/Campaigns";
import Hero from "../components/Hero";
import CreateCampaign from "../components/CreateCampaign";
import AddButton from "../components/AddButton";
import { loadCampaigns } from "../services/blockchain";

const Home = () => {
  useEffect(async () => {
    await loadCampaigns();
  }, []);

  return (
    <>
      <Hero />
      <Campaigns />
      <div className="flex justify-center items-center my-5">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-400
        text-white font-medium text-xs leading-tight uppercase 
        rounded-full shadow-md hover:bg-blue-700 hover:text-white"
        >
          Load More Campaigns
        </button>
      </div>
      <CreateCampaign />
      <AddButton />
    </>
  );
};

export default Home;
