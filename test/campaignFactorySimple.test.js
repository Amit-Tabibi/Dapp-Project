const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CampaignFactory", function () {
  let CampaignFactory;
  let owner;

  beforeEach(async () => {
    [owner, campaignOwner, nonOwner] = await ethers.getSigners(); // Update this line
    CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    campaignFactory = await CampaignFactory.deploy(10);
    await campaignFactory.deployed();
  });

  it("should deploy the CampaignFactory contract", async function () {
    // Check if the contract was deployed successfully
    expect(campaignFactory.address).to.not.equal(0);
  });

  it("should allow the owner to create a campaign", async function () {
    // Create a campaign
    await campaignFactory.connect(owner).createCampaign(
      "Test Campaign",
      "Test Description",
      "Test Image URL",
      ethers.utils.parseEther("1"), // 1 Ether cost
      Math.floor(Date.now() / 1000) + 86400 // Expires in 1 day
    );

    // Check if the campaign was created
    const campaigns = await campaignFactory.getCampaigns();
    expect(campaigns.length).to.equal(1);

    // Check if the details of the created campaign are correct
    const createdCampaign = await campaignFactory.getCampaign(0);
    expect(createdCampaign.title).to.equal("Test Campaign");
    expect(createdCampaign.owner).to.equal(owner.address);
  });

  it("should allow anyone to create a campaign", async function () {
    const [nonOwner] = await ethers.getSigners();

    // Create a campaign with a non-owner account
    await campaignFactory.connect(nonOwner).createCampaign(
      "Test Campaign",
      "Test Description",
      "Test Image URL",
      ethers.utils.parseEther("1"), // 1 Ether cost
      Math.floor(Date.now() / 1000) + 86400 // Expires in 1 day
    );

    // Check if the campaign was created
    const campaigns = await campaignFactory.getCampaigns();
    expect(campaigns.length).to.equal(1);

    // Check if the details of the created campaign are correct
    const createdCampaign = await campaignFactory.getCampaign(0);
    expect(createdCampaign.title).to.equal("Test Campaign");
    expect(createdCampaign.owner).to.equal(nonOwner.address);
  });

  it("should allow users to donate to a campaign", async function () {
    const [donor] = await ethers.getSigners();

    // Create a campaign
    await campaignFactory.connect(owner).createCampaign(
      "Donation Campaign",
      "Donation Description",
      "Donation Image URL",
      ethers.utils.parseEther("1"), // 1 Ether cost
      Math.floor(Date.now() / 1000) + 86400 // Expires in 1 day
    );

    // Donate to the campaign
    await campaignFactory
      .connect(donor)
      .donateCampaign(0, { value: ethers.utils.parseEther("0.5") });

    // Check if the donation was successful
    const donatedCampaign = await campaignFactory.getCampaign(0);
    expect(donatedCampaign.raised).to.equal(ethers.utils.parseEther("0.5"));
  });

  //fix this unit test
  /*it("should automatically pay out when the campaign is fully funded", async function () {
    // Create a campaign with the campaign owner
    await campaignFactory
      .connect(campaignOwner)
      .createCampaign(
        "Payout Campaign",
        "Campaign for Payout Testing",
        "Image URL",
        ethers.utils.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400
      );

    // Donate to the campaign
    await campaignFactory
      .connect(nonOwner)
      .donateCampaign(0, { value: ethers.utils.parseEther("1") });

    // Check if the campaign status is now "PAIDOUT"
    const updatedCampaign = await campaignFactory.getCampaign(0);
    expect(updatedCampaign.status).to.equal(CampaignFactory.statusEnum.PAIDOUT);

    // Check if the balance of the campaign owner has increased
    const finalBalance = await ethers.provider.getBalance(
      campaignOwner.address
    );
    // Assuming the tax is already deducted in the contract
    expect(finalBalance.gt(ethers.utils.parseEther("0.9"))).to.be.true;
  });*/
});
