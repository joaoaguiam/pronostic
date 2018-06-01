pragma solidity ^0.4.21;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract Pixel4Impact is ERC721Token, Ownable {

    uint public xPixels;
    uint public yPixels;
    uint public minDonation;
    string public metadataUri;


    function Pixel4Impact(uint _xPixels, uint _yPixels, uint _minDonation, string _metadataUri) ERC721Token("Pixel4Impact", "P4I") public { 
        xPixels = _xPixels;
        yPixels = _yPixels;
        minDonation = _minDonation;
        metadataUri = _metadataUri;
    }

    struct Pixel {
        uint x;
        uint y;
        string color;
        uint donation;
    }
    
    Pixel[] pixels;
    mapping(uint => mapping(uint => bool)) pixelsTaken;
    address[] donators;

    
    event PixelCreated(uint x, uint y, string color, uint donation, address contributor);
    event DebugStr(string value);
    event DebugInt(uint value);

    modifier tokenAvailable(uint x, uint y) {
        require(!pixelsTaken[x][y]);
        require(x < xPixels);
        require(y < yPixels);
        _;
    }

    modifier isMinDonation() {
        require(msg.value >= minDonation);
        _;
    }


    function donatePixel(uint _x, uint _y, string _color) public payable tokenAvailable(_x, _y) isMinDonation() {
        emit DebugInt(_x);
        emit DebugInt(_y);
        emit DebugStr(_color);
        emit DebugInt(msg.value);
        uint256 newTokenId = _getNextTokenId();
        _mint(msg.sender, newTokenId);
        Pixel memory pixel = Pixel({
            x: _x,
            y: _y,
            color: _color,
            donation: msg.value
        });
        pixels.push(pixel);
        pixelsTaken[_x][_y] = true;
        donators.push(msg.sender);
        // owner.transfer(msg.value);
    }

    function _getNextTokenId() private view returns (uint256) {
        return totalSupply();
    }

    function getDetails() public view returns(uint _xPixels, uint _yPixels, uint _minDonation, string _metadataUri) {
        return (uint(xPixels), uint(yPixels), minDonation, metadataUri);
    }
    function getNumPixelsTaken() public view returns(uint) {
        return pixels.length;
    }

    function getPixelTakenByIndex(uint _index) public view returns(uint x, uint y, string color, uint donation) {
        Pixel storage pixel = pixels[_index];
        return (pixel.x, pixel.y, pixel.color, pixel.donation);
    }

    function getNumDonators() public view returns(uint) {
        return donators.length;
    }
    function getDonatorAddressByIndex(uint _index) public view returns(address) {
        return donators[_index];
    }

    function () external payable {
        //TODO;
    }

    // function withdraw(uint amount) onlyOwner returns(bool) {
    //     require(amount < this.balance);
    //     owner.transfer(amount);
    //     return true;

    // }

}