import React, { useEffect } from "react";
import Campaigns from "../components/Campaigns";
import Hero from "../components/Hero";
import CreateCampaign from "../components/CreateCampaign";
import AddButton from "../components/AddButton";
import { loadCampaigns } from "../services/blockchain";
import { useGlobalState } from "../store";

const Home = () => {
  const [campaigns] = useGlobalState('campaigns')

  useEffect(() => {
  (async () => {
    try {
      await loadCampaigns();
    } catch (error) {
      console.log(error);
    }
  })();
}, []);

  return (
    <>
      <Hero />
      <Campaigns campaigns={campaigns}/>
      <CreateCampaign />
      <AddButton />
    </>
  );
};

export default Home;
