import React, { useEffect } from "react";
import CampaignDetails from "../components/CampaignDetails";
import CampaignDoners from "../components/CampaignDoners";
import UpdateCampaign from "../components/UpdateCampaign";
import DonateCampaign from "../components/DonateCampaign";
import DeleteCampaign from "../components/DeleteCampaign";
import { loadCampaign } from "../services/blockchain";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../store";

const Campaign = () => {
  const { id } = useParams()
  const [campaign] = useGlobalState('campaign')

  useEffect(() => {
  (async () => {
    try {
      await loadCampaign(id);
    } catch (error) {
      console.log(error);
    }
  })();
}, []);

  return (
    <>
      <CampaignDetails campaign = {campaign}/>
      <CampaignDoners />
      <UpdateCampaign />
      <DonateCampaign />
      <DeleteCampaign/>
    </>
  );
};

export default Campaign;
