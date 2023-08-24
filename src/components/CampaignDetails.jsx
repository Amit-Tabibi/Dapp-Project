import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { setGlobalState } from "../store";
const CampaignDetails = () => {
  return (
    <div className="py-24 px-6 flex justify-center">
      <div className="flex justify-center flex-col md:w-2/3">
        <div
          className="flex justify-start items-start sm:space-x-4
        flex-wrap"
        >
          <img
            src="https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
            alt="campaign title"
            className="rounded-xl h-64 w-full object-cover sm:w-1/3"
          />

          <div className="flex-1 sm:py-0 py-4">
            <div className="flex flex-col justify-start flex-wrap ">
              <h5 className="text-gray-900 text-sm font-medium mb-2">
                Campaign Title
              </h5>
              <small className="text-gray-500"> 3 days left</small>
            </div>

            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2 ">
                <Identicons
                  className="rounded-full shadow-md"
                  string="0x9e....13aaf"
                  size={15}
                />
                <small className="text-gray-700">0x9e...13af</small>
                <small className="text-gray-500 font-bold">{16} Doners</small>
              </div>

              <div className="font-bold">
                <small className="text-gray-500">Open</small>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-light mt-2">
          Ethereum is a decentralized blockchain platform that enables the
          creation and execution of smart contracts and decentralized
          applications (DApps). It was proposed in late 2013 by Vitalik Buterin
          and went live in 2015. Unlike Bitcoin, Ethereum's focus extends beyond
          digital currency – it offers a versatile environment for developers to
          build and deploy a wide range of applications using its native
          cryptocurrency, Ether. Ethereum's innovative use of smart contracts
          has transformed industries by automating processes and enabling
          trustless interactions on a global scale. However, it faces challenges
          such as scalability and energy efficiency, which the community is
          actively working to address through upgrades like Ethereum 2.0.
        </p>

        <div className="w-full bg-gray-300 mt-4">
          <div
            className="bg-green-600 text-xs font-medium text-blue-100 text-center
          p-0.5 leading-none rounded-l-full "
            style={{ width: "50%" }}
          ></div>
        </div>

        <div className="flex justify-between items-center font-bold mt-2">
          <small>{3} ETH Donated</small>
          <small className="flex justify-start items-center">
            <FaEthereum />
            <span>{10} ETH</span>
          </small>
        </div>

        <div className="flex justify-start items-center space-x-2 mt-4 ">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-400
        text-white font-medium text-xs leading-tight uppercase 
        rounded-full shadow-md hover:bg-blue-700 hover:text-white"
            onClick={() => setGlobalState("donateModal", "scale-100")}
          >
            Donate
          </button>
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
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-orange-400
        text-white font-medium text-xs leading-tight uppercase 
        rounded-full shadow-md hover:bg-orange-700 hover:text-white"
          >
            PAYOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
