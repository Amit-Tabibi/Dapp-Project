import abi from "../abis/src/contracts/CampaignFactory.sol/CampaignFactory.json";
import address from "../abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "../store";
import { ethers } from "ethers";
import { json } from "react-router-dom";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
  } catch (error) {
    reportError(error);
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainid) => {
      Window.location.reload;
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found");
    }
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const createCampaign = async ({
  title,
  description,
  imageURL,
  cost,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    cost = ethers.utils.parseEther(cost);
    await contract.createCampaign(
      title,
      description,
      imageURL,
      cost,
      expiresAt
    );
  } catch (error) {
    reportError(error);
  }
};

const updateCampaign = async ({
  id,
  title,
  description,
  imageURL,
  expiresAt,
}) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getEthereumContract();
    await contract.updateCampaign(
      id,
      title,
      description,
      imageURL,
      expiresAt
    );
  } catch (error) {
    reportError(error);
  }
};

const deleteCampaign = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask"); 
    const contract = await getEthereumContract()
    await contract.deleteCampaign(id)
  } catch (error) {
    reportError(error)
  }
};

const donateCampaign = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask"); 
    const connectedAccount = getGlobalState('connectedAccount')
    const contract = await getEthereumContract()
    amount = ethers.utils.parseEther(amount)

    await contract.donateCampaign(id, {
      from: connectedAccount,
      value: amount._hex
    })
  } catch (error) {
    reportError(error)
  }
};

const loadCampaigns = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask");

    const contract = await getEthereumContract();
    const campaigns = await contract.getCampaigns();
    const stats = await contract.stats();

    setGlobalState("stats", structureStats(stats));
    setGlobalState( "campaigns", structuredCampaigns(campaigns));

  } catch (error) {
    reportError(error);
  }
};

const loadCampaign = async (id) => {
  try {
    if(!ethereum) return alert('Please install Metamask')
    const contract = await getEthereumContract()
    const  campaign = await contract.getCampaign(id)

    setGlobalState('campaign', structuredCampaigns([campaign])[0])
    console.log("Campaign Loaded...")
  }
    catch(error) {
      alert(JSON.stringify(error.message))
      reportError(error)
    }
  }

const structuredCampaigns = (campaigns) =>
  campaigns
    .map((campaign) => ({
      id: campaign.id.toNumber(),
      owner: campaign.owner.toLowerCase(),
      title: campaign.title,
      description: campaign.description,
      timestamp: new Date(campaign.timestamp.toNumber()).getTime(),
      expiresAt: new Date(campaign.expiresAt.toNumber()).getTime(),
      date: toDate(campaign.expiresAt.toNumber() * 1000),
      imageURL: campaign.imageURL,
      raised: parseInt(campaign.raised._hex) / 10 ** 18,
      cost: parseInt(campaign.cost._hex) / 10 ** 18,
      donors: campaign.donors.toNumber(),
      status: campaign.status,
    }))
    .reverse();

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth()}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const structureStats = (stats) => ({
  totalCampaigns: stats.totalCampaigns.toNumber(),
  totalDonors: stats.totalDonors.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { connectWallet, isWalletConnected, createCampaign, updateCampaign, deleteCampaign, loadCampaigns, loadCampaign, donateCampaign};
