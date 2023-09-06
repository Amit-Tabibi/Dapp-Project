import { Link } from "react-router-dom";
import Identicons from "react-identicons";
import { daysRemaining, truncate } from "../store";
import { FaEthereum } from "react-icons/fa";

const Campaigns = ({ campaigns }) => {
  return (
    <div className="flex flex-col px-6 ">
      <div className="flex justify-center items-center flex-wrap ">
        {campaigns.map((campaign, i) => (
            <CampaignCard key={i} campaign={campaign} />
          ))}
      </div>
    </div>
  );
};

const CampaignCard = ({ campaign }) => (
  <div id="campaigns" className="rounded-lg shadow-lg bg-white w-64 m-4">
    <Link to={"/Campaigns/" + campaign.id}>
      <img
        src={campaign.imageURL}
        alt={campaign.title}
        className="rounded-xl h-64 w-full object-cover"
      />
      <div className="p-4">
        <h5>{campaign.title}</h5>
        <div flex flex-col>
          <div className="flex justify-between items-center mb-3">
            <Identicons
              className=" shadow-md"
              string={campaign.owner}
              size={20}
            />
            <small className="text-gray-700">{truncate(campaign.owner, 4, 4, 11)}</small>
          </div>
          <small className="text-gray-500">{new Date().getTime() >
           Number(campaign.expiresAt + '000') ? 'Expired' :
            daysRemaining(campaign.expiresAt) + ' left'}
            </small>
        </div>

        <div className="w-full bg-gray-300">
          <div
            className="bg-green-600 text-xs font-medium text-blue-100 text-center
          p-0.5 leading-none rounded-l-full "
            style={{ width: `${ (campaign.raised / campaign.cost) * 100 }%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center 
        font-bold mt-1 mb-2 text-gray-700">
          <small>{campaign.raised} ETH Raised</small>
          <small className="flex justify-start items-center">
            <FaEthereum />
            <span>{campaign.cost} ETH</span>
          </small>
        </div>

        <div
          className="flex justify-between items-center flex-wrap
        mt-4 mb-2 text-gray-500 font-bold"
        >
          <small>{campaign.donors} Donor{campaign.donors == 1 ? '' : 's'}</small>
          <div>
            {campaign.status == 0 ? (
            <small className="text-gray-500">OPEN</small>
            ) : campaign.status == 1 ? (
              <small className="text-green-500">REACHED FINAL GOAL</small>
            ) : campaign.status == 2 ? (
              <small className="text-gray-500">REVERTED</small>
            ) : campaign.status == 3 ? (
              <small className="text-red-500">DELETED</small>
            ) : (
              <small className="text-orange-500">SENT</small>
            )}
          </div>
        </div>
      </div>
    </Link>
  </div>
);
export default Campaigns;
