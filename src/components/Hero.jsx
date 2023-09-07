import React from "react";
import { setGlobalState, useGlobalState } from "../store";

const Hero = () => {
  const [stats] = useGlobalState('stats')
  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6 ">
      <h1
        className="text-5xl text-6 xl:text-7xl font-bold
      tracking-tight"
      >
        <span className="capitalize text-blue-400">Simply Donate</span>
        <span className="text-red-500">.</span>
      </h1>
      <br />
      <div className="flex justify-center items-center space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-400
        text-white font-medium text-xs leading-tight uppercase 
        rounded-full shadow-md hover:bg-blue-700 hover:text-white"
        onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Add Campaign
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5 border border-blue-400
        text-blue-500 font-medium text-xs leading-tight uppercase 
        rounded-full shadow-md bg-transparent hover:bg-blue-700 hover:text-white"
        >
          Donate
        </button>
      </div>

      <div className="flex justify-center items-center mt-10">
        <div
          className="flex flex-col justify-center items-center
        h-20 border shadow-md w-full "
        >
          <span className="text-lg font-bold text-blue-900 leading-5">{stats?.totalCampaigns || 0}</span>
          <span>Campaigns</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
        h-20 border shadow-md w-full "
        >
          <span className="text-lg font-bold text-blue-900 leading-5">{stats?.totalDonors|| 0}</span>
          <span>Donors</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
        h-20 border shadow-md w-full "
        >
          <span className="text-lg font-bold text-blue-900 leading-5">
            {stats?.totalDonations || 0} ETH
          </span>
          <span>Donated</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
