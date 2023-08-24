import React from "react";
import CampaignDetails from "../components/CampaignDetails";
import CampaignDoners from "../components/CampaignDoners";
import UpdateCampaign from "../components/UpdateCampaign";
import DonateCampaign from "../components/DonateCampaign";
import DeleteCampaign from "../components/DeleteCampaign";

const Campaign = () => {
  return (
    <>
      <CampaignDetails />
      <CampaignDoners />
      <UpdateCampaign />
      <DonateCampaign />
      <DeleteCampaign/>
    </>
  );
};

export default Campaign;
