// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract CampaignFactory {
    address public owner;
    uint public campaignTax;
    uint public campaignCount;
    uint public balance;
    statsStruct public stats;
    campaignStruct[] campaigns; 

    mapping (address => campaignStruct[]) campaignOf;
    mapping (uint => donorStruct[]) donorsOf;
    mapping (uint  => bool) public campaignExist;

    enum statusEnum{
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct statsStruct{
        uint totalCampaigns;
        uint totalDonors;
        uint totalDonations;
    }

    struct campaignStruct{
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint cost;
        uint raised;
        uint timestap;
        uint expiresAt;
        uint donors;
        statusEnum status;
    }

    struct donorStruct{
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }
    
    modifier ownerOnly() {
        require(msg.sender == owner , "owner reserved only");
        _;
    }

    event Action (
        uint256 id,
        string actionType,
        address indexed excutor,
        uint256 timestamp
    );

    constructor(uint _campaignTax){
        owner = msg.sender;
        campaignTax = _campaignTax;
    }

    function createCampaign(
        string memory title,
        string memory description,
        string memory imageURL,
        uint cost,
        uint expiresAt
    ) public returns (bool) {
        require(bytes(title).length>0, "Title cannot be empty");
        require(bytes(description).length>0, "Description cannot be empty");
        require(bytes(imageURL).length>0, "ImageURL cannot be empty");
        require(cost>0 ether, "Cost cannot be zero");

        campaignStruct memory campaign;
        campaign.id = campaignCount;
        campaign.owner = msg.sender;
        campaign.title = title;
        campaign.description = description;
        campaign.imageURL = imageURL;
        campaign.cost = cost;
        campaign.timestap = block.timestamp;
        campaign.expiresAt = expiresAt;

        campaigns.push(campaign);
        campaignExist[campaignCount] = true;
        campaignOf[msg.sender].push(campaign);
        stats.totalCampaigns += 1;

        emit Action(
            campaignCount++,
            "PROJECT CREATED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function updateCampaign(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    )  public returns (bool) {
        require(msg.sender == campaigns[id].owner, "Unauthorized");
        require(bytes(title).length>0, "Title cannot be empty");
        require(bytes(description).length>0, "Description cannot be empty");
        require(bytes(imageURL).length>0, "ImageURL cannot be empty");

        campaigns[id].title = title;
        campaigns[id].description = description;
        campaigns[id].imageURL = imageURL;
        campaigns[id].expiresAt = expiresAt;

        emit Action( 
            id,
            "PROJECT UPDATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function deleteCampaign(uint id ) public returns (bool) {
        require(campaigns[id].status == statusEnum.OPEN,"Campaign no longer opened");
        require(
            msg.sender == campaigns[id].owner || 
            msg.sender == owner , "Unauthorized Entity"
        );

        campaigns[id].status = statusEnum.DELETED;
        preformRefund(id); 

        emit Action (
            id,
            "PROJECT DELETED",
            msg.sender,
            block.timestamp
        );
        return true;
    }

    function preformRefund(uint id) internal {
        for(uint i=0;i < donorsOf [id].length; i++){
        address _owner = donorsOf[id][i].owner;
        uint _contribution = donorsOf[id][i].contribution;

        donorsOf[id][i].refunded = true;
        donorsOf[id][i].timestamp = block.timestamp;
        payTo(_owner,_contribution);

        stats.totalDonors -= 1; 
        stats.totalDonations -= _contribution;

    }
 }
    function donateCampaign(uint id ) public payable returns (bool) {
        require(msg.value > 0 ether ,"Ether musy be greater then zero");
        require (campaignExist[id],"Campaign not found");
        require (campaigns[id].status == statusEnum.OPEN, " Campaign no logner opened");

        stats.totalDonors += 1;
        stats.totalDonations += msg.value;
        campaigns[id].raised += msg.value;
        campaigns[id].donors +=1 ;

        donorsOf[id].push(
            donorStruct(
                msg.sender,
                msg.value,
                block.timestamp,
                false
            )
        );

        emit Action (
            id,
            "DONTED",
            msg.sender,
            block.timestamp
        );

        // to add line 188-202
    }
 
    function payTo(address to, uint256 amount) internal {
        (bool success, )= payable(to).call{value:amount}("");
        require (success);
    }

}

