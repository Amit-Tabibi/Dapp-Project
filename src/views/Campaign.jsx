import React, { useEffect, useState } from "react";
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
  const [loaded, setLoaded] = useState(false)
  const [campaign] = useGlobalState('campaign')

  useEffect(() => {
  (async () => {
    try {
      await loadCampaign(id);
      setLoaded(true)
    } catch (error) {
      console.log(error);
    }
  })();
}, []);

  return loaded ? (
    <>
      <CampaignDetails campaign = {campaign}/>
      <UpdateCampaign campaign = {campaign} />
      <DeleteCampaign campaign = {campaign} />
      <DonateCampaign campaign = {campaign} />
      <CampaignDoners />
    </>
  ): null
};

export default Campaign;
