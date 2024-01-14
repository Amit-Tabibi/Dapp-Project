import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../store";
import { useState } from "react";
import { createCampaign } from "../services/blockchain";
import { toast } from "react-toastify";
import axios  from "axios";
import axiosRetry  from "axios-retry";
import FormData  from "form-data";
import streamifier from "streamifier"
import streamToBlob from 'stream-to-blob';

const CreateCampaign = () => {
  const [createModal] = useGlobalState("createModal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZGQ3NWM1Yy04ZjNlLTRjZDEtYmUwZC1lZjIwYTE4NjVhNTQiLCJlbWFpbCI6IjFpbnZlc3RhbWl0QHByb3Rvbm1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImZhMzQ5YWI1YTJkMTgzN2ZmY2Q0Iiwic2NvcGVkS2V5U2VjcmV0IjoiNGYyOTU2MjU4YTZkNmFmMGYxNDBjY2MwNWNhNDhmMDNiMmMyZGYyNTVjMzc4MjcwZjUzZDJkNjE3NzY4ZjZkNCIsImlhdCI6MTcwNDk5MTMwNH0.1YQ9tvA7-Ldsav2Pu426zOprJm1hC8mmxIsdPCP4k-E'
  
  const toTimeStamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);

      setImageFile(file);
    }
  };

  const uploadToPinata = async (file) => {

  const axiosInstance = axios.create();
	axiosRetry(axiosInstance, { retries: 5 });
    
      try {
        const formData = new FormData();

        // Convert the image file to a stream
        const imageStream = streamifier.createReadStream(file);
        const imageBlob = await streamToBlob(imageStream);

        // Append the stream to FormData
        formData.append('file', imageBlob, { filename: title });

        // Now you can use formData for your IPFS request or any other purpose

      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization': `Bearer ${JWT}`,
        }
      });

      console.log(res);
      return res.data.IpfsHash
    }
     catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !cost || !date || !imageURL) return;

    const imageIPFSHash = await uploadToPinata(imageFile)
    const ipfsGatewayURL = `https://gateway.ipfs.io/ipfs/${imageIPFSHash}`;

    try {

      const params = {
        title,
        description,
        cost,
        expiresAt: toTimeStamp(date),
        imageURL:ipfsGatewayURL,
      };

      await createCampaign(params);
      toast.success("Campaign Created Successfully, will reflect in 30 seconds.");
      onClose();
    } catch (error) {
      // Handle error
      console.log(error)
    }
  };

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    reset();
  };

  const reset = () => {
    setTitle(""), setCost(""), setDescription(""), setImageURL(""), setDate("");
  };


  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h- 7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Add Campaign</p>
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
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
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
              type="file"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => handleImageUpload(e)}
              accept="image/*"
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
            Submit Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;
