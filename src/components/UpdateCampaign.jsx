import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useState } from "react";
import { updateCampaign } from "../services/blockchain";
import { toast } from "react-toastify";

const UpdateCampaign = ({ campaign }) => {
  const [updateModal] = useGlobalState("updateModal");
  const [title, setTitle] = useState(campaign?.title);
  const [description, setDescription] = useState(campaign?.description);
  const [date, setDate] = useState(campaign?.date);
  const [imageURL, setImageURL] = useState(campaign?.imageURL);

  const toTimeStamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !imageURL) return;

    const params = {
      id: campaign?.id,
      title,
      description,
      expiresAt: toTimeStamp(date),
      imageURL,
    };

    await updateCampaign(params);
    toast.success("Campaign Updated Successfully, will reflect in 30 seconds.");
    onClose();
  };

  const onClose = () => {
    setGlobalState("updateModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${updateModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h- 7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Edit Campaign</p>
            <button
              onClick={onClose}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={
                  imageURL ||
                  "https://avatars.githubusercontent.com/u/6250754?s=200&v=4"
                }
                alt="campaign title"
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
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div
            className="flex justify-between items-center bg-gray-300
                rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
                    border-0 text-sm text-slate-500 focus:outline-none
                    focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div
            className="flex justify-between items-center bg-gray-300
                rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
                    border-0 text-sm text-slate-500 focus:outline-none
                    focus:ring-0"
              type="text"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div
            className="flex justify-between items-center bg-gray-300
                rounded-xl mt-5"
          >
            <textarea
              className="block w-full bg-transparent
                    border-0 text-sm text-slate-500 focus:outline-none
                    focus:ring-0"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-blue-400
                     text-white font-medium text-md leading-tight 
                    rounded-full shadow-md hover:bg-blue-700 hover:text-white mt-5"
          >
            Update Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCampaign;
