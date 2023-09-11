import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { deleteCampaign } from "../services/blockchain";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteCampaign = ({ campaign }) => {
  const [deleteModal] = useGlobalState("deleteModal");
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await deleteCampaign(campaign?.id);
    toast.success("Campaign Dele ted Successfully, will reflect in 30 seconds.");
    setGlobalState("deleteModal", "scale-0")
    navigate.push('/')
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
       justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${deleteModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h- 7/12 p-6"
      >
        <div className="flex flex-col ">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{campaign?.title}</p>
            <button
              onClick={() => setGlobalState("deleteModal", "scale-0")}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={campaign?.imageURL ||"https://avatars.githubusercontent.com/u/6250754?s=200&v=4"}
                alt={campaign?.title}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div
            className="flex flex-col justify-center items-center
                rounded-xl mt-5"
          >
            <p>Are you sure?</p>
            <small className="text-red-400">This is irreversible</small>
          </div>

          <button
            className="inline-block px-6 py-2.5 bg-red-400
            text-white font-medium text-md leading-tight 
            rounded-full shadow-md hover:bg-red-700 hover:text-white mt-5"
            onClick={handleSubmit}
          >
            Delete Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCampaign;
