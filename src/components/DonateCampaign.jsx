import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useState } from "react";
import { toast } from "react-toastify";
import { donateCampaign } from "../services/blockchain";

const DonateCampaign = ({ campaign }) => {
  const [donateModal] = useGlobalState("donateModal");
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return; 

    await donateCampaign(campaign?.id, amount)
    toast.success("Campaign was donated Successfully, will reflect in 30 seconds.");
    setGlobalState("donateModal", "scale-0")
  };
  
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
       justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${donateModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h- 7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{campaign?.title}</p>
            <button
              onClick={() => setGlobalState("donateModal", "scale-0")}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={campaign?.imageURL || "https://avatars.githubusercontent.com/u/6250754?s=200&v=4"}
                alt={campaign?.title}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div
            className="flex justify-between items-center bg-gray-300
                rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
                    border-0 text-sm text-slate-500 focus:outline-none
                    focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-blue-400
                     text-white font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-blue-700 hover:text-white mt-5"
          >
            Donate Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateCampaign;
