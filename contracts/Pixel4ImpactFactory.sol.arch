pragma solidity ^0.4.21;

import "./Pixel4Impact.sol";

contract Pixel4ImpactFactory {

    // owner => events
    mapping (address => address[]) private campaignsByOwners ;

    // known events
    address[] public campaigns;    

    event CampaignCreated(uint16 xPixels, uint16 yPixels, uint minDonation, string metadataUri, address addr, address owner);

    function Pixel4ImpactFactory() public {

    }

    function createCampaign(uint16 _xPixels, uint16 _yPixels, uint _minDonation, string _metadataUri) public {
        Pixel4Impact campaign = new Pixel4Impact(_xPixels, _yPixels, _minDonation, _metadataUri);
        campaign.transferOwnership(msg.sender);
        address campaignAddress = address(campaign);
        campaignsByOwners[msg.sender].push(campaign);
        campaigns.push(campaignAddress);
        emit CampaignCreated(_xPixels, _yPixels, _minDonation, _metadataUri, campaignAddress, msg.sender);
    }

    function getNumberCampaignsByOwner(address _owner) public view returns (uint) {
        return campaignsByOwners[_owner].length;
    }

    function getCampaignAddressByOwnerByIndex(address _owner, uint _index) public view returns (address) {
        require(_index < campaignsByOwners[_owner].length);
        return campaignsByOwners[_owner][_index];
    }

    function getNumberAllCampaigns() public view returns(uint) {
        return campaigns.length;
    }

    function getCampaignAddressByIndex(uint _index) public view returns (address) {
        require(_index < campaigns.length);
        return campaigns[_index];
    }
}
