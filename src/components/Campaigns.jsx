import React from "react";
import { Link } from "react-router-dom";
import Identicons from "react-identicons";
const Campaigns = () => {
  return (
    <div className="flex flex-col px-6 ">
      <div className="flex justify-center items-center flex-wrap ">
        {Array(6)
          .fill()
          .map((card, i) => (
            <CampaignCard key={i} id={i} campaign={card} />
          ))}
      </div>
    </div>
  );
};

const CampaignCard = ({ card, id }) => (
  <div id="campaigns" className="rounded-lg shadow-lg bg-white w-64 m-4">
    Card
    <Link to={"/Campaigns/" + id}>
      <img
        src="https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
        alt="campaign title"
        className="rounded-xl h-64 w-full object-cover"
      />
      <div className="p-4">
        <h5>Campaign Title</h5>
        <div flex flex-col>
          <div className="flex justify-between items-center mb-3">
            <Identicons
              className="rounded-full shadow-md"
              string="0x15......1ea2"
              size={15}
            />
            <small className="text-gray-700">0x15......1ea2</small>
          </div>
          <small className="text-gray-500">2 days left</small>
        </div>

        <div className="w-full bg-gray-300">
          <div
            className="bg-green-600 text-xs font-meduim text-blue-100 text-center
          p-0.5 leading-none rounded-l-full h-1"
            style={{ width: "50%" }}
          ></div>
        </div>

        <div
          className="flex justify-between items-center flex-wrap
        mt-4 mb-2 text-gray-500 font-bold"
        >
          <small>{14} Doners</small>
          <div>
            <small className="text-green-500">OPEN</small>
          </div>
        </div>
      </div>
    </Link>
  </div>
);
export default Campaigns;
