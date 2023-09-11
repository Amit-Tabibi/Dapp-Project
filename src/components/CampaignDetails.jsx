import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { daysRemaining, setGlobalState, truncate, useGlobalState } from "../store";

const CampaignDetails = ({ campaign }) => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <div className="py-24 px-6 flex justify-center">
      <div className="flex justify-center flex-col md:w-2/3">
        <div
          className="flex justify-start items-start sm:space-x-4
        flex-wrap"
        >
          <img
            src={campaign?.imageURL}
            alt={campaign?.title}
            className="rounded-xl h-64 w-full object-cover sm:w-1/3"
          />

          <div className="flex-1 sm:py-0 py-4">
            <div className="flex flex-col justify-start flex-wrap ">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {campaign?.title}
              </h5>
              <small className="text-gray-500">
                {new Date().getTime() >
                Number(campaign?.expiresAt + '000') ? 'Expired' :
                daysRemaining(campaign?.expiresAt) + ' left'}
              </small>
            </div>

            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2 ">
                <Identicons
                  className="rounded-full shadow-md"
                  string={campaign?.owner}
                  size={15}
                />
                {campaign?.owner ? (
                <small className="text-gray-700">{truncate(campaign?.owner, 4, 4, 11)}</small>
                ) : null}
                <small className="text-gray-500 font-bold">
                  {campaign?.donors} Donor{campaign?.donors == 1 ? '' : 's'}
                </small>
              </div>

              <div className="font-bold">
                {campaign?.status == 0 ? (
                <small className="text-gray-500">OPEN</small>
                ) : campaign?.status == 1 ? (
                  <small className="text-green-500">REACHED FINAL GOAL</small>
                ) : campaign?.status == 2 ? (
                  <small className="text-gray-500">REVERTED</small>
                ) : campaign?.status == 3 ? (
                  <small className="text-red-500">DELETED</small>
                ) : (
                  <small className="text-orange-500">SENT</small>
                )}
              </div>

            </div>

                     <div>
          <p className="text-sm font-light mt-2"> {campaign?.description}</p>

        <div className="w-full bg-gray-300 mt-4">
          <div
            className="bg-green-600 text-xs font-medium text-blue-100 text-center
          p-0.5 leading-none rounded-l-full "
            style={{ width: `${ (campaign?.raised / campaign?.cost) * 100 }%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center font-bold mt-2">
          <small>{campaign?.raised} ETH Donated</small>
          <small className="flex justify-start items-center">
            <FaEthereum />
            <span>{campaign?.cost} ETH</span>
          </small>
        </div>

        <div className="flex justify-start items-center space-x-2 mt-4 ">
          {campaign?.status == 0 ? (
            <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-400
                text-white font-medium text-xs leading-tight uppercase 
                rounded-full shadow-md hover:bg-blue-700 hover:text-white"
                onClick={() => setGlobalState("donateModal", "scale-100")}
              >
                Donate
          </button>
          ) : null }
           
          {connectedAccount == campaign?.owner ? (
            campaign?.status != 3 ? (
              campaign?.status == 1 ? (
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-orange-400
                text-white font-medium text-xs leading-tight uppercase 
                rounded-full shadow-md hover:bg-orange-700 hover:text-white"
              >
                PAYOUT
              </button>
              ) : campaign?.status != 4 ? (
              <>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-gray-400
                text-white font-medium text-xs leading-tight uppercase 
                rounded-full shadow-md hover:bg-gray-700 hover:text-white"
                onClick={() => setGlobalState("updateModal", "scale-100")}
              >
                EDIT
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-400
                text-white font-medium text-xs leading-tight uppercase 
                rounded-full shadow-md hover:bg-red-700 hover:text-white"
                onClick={() => setGlobalState("deleteModal", "scale-100")}
                >
                DELETE
              </button>
            </>
              ) : (
                <button
                type="button"
                className="inline-block px-6 py-2.5 bg-gray-400
                text-white font-medium text-xs leading-tight uppercase 
                rounded-full shadow-md hover:bg-gray-700 hover:text-white"
                >
                Campaign Closed
              </button>
              )
            ) : null
          ) : null}
        </div>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
