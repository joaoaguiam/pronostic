pragma solidity ^0.4.22;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract WCwagers is Ownable {
    uint constant internal USDTOWEI  = 1666666666666666;
    // 600$ is 1 ETH, but 1 ETH is on 18 digits so 1'000'000'000'000'000'000 / 600 = 166666666666666
    // enum Phase {Group, Round16, Quarters, Semis, Finals}
    //mapping (Phase => uint) phaseDates; //cannot use enum in mapping
    mapping (string => uint) phaseDates;
    string contestName;
    uint public wagerSize;
    uint public potSize;
    address[] public participants;
    // this maps the participants to a mapping of phase (string for phase enum) and URLs
    mapping (address => mapping(string => string)) private usersURLs;

    // constuctor takes in input the name of the contest (e.g. NagraStar, soccerNuts) and wager size in USD.
    // The wager size will be converted to Ether using a fixed value
    constructor(string _name, uint _wagerSize) public {
        wagerSize = _wagerSize * USDTOWEI;
        contestName = _name;
        phaseDates["Group"] = 1529010000;
        phaseDates["Round16"] = 1530388800;
        phaseDates["Quarters"] = 1530907200;
        phaseDates["Semis"] = 1531267200;
        phaseDates["Finals"] = 1531598400; // unix epoch dates for submission deadline
    }

    function getWagerSize() public view returns (uint) {
      return wagerSize;
    }

    function registerParticipant() public payable isAtLeastWagerSize() {
        potSize += msg.value; // do I need this, or can I use this.balance to retrieve the pot size ?
        participants.push(msg.sender);
        emit ParticipantAdded(msg.sender);
    }
    event ParticipantAdded(address participant);
    //event DebugStr(string value);
    //event DebugInt(uint value);

    modifier isAtLeastWagerSize() {
        require(msg.value >= wagerSize);
        _;
    }

    modifier isThereTime(string _phase) {
        require(phaseDates[_phase] <= block.timestamp);
        _;
    }

    modifier isItTimeYet(string _phase) {
        require(phaseDates[_phase] >= block.timestamp);
        _;
    }


    function writeURL(string _URL, string _phase) public isThereTime(_phase) {
      usersURLs[msg.sender][_phase]=_URL;
    }
// Does it make sense to have this function?
// If I want to retrieve my URLs before the deadline, this is what I'd use
    function getOwnURL(string _phase) public view returns (string) {
      return usersURLs[msg.sender][_phase];
    }

    function getURL(address _participant, string _phase) public view isItTimeYet(_phase) returns (string) {
      return usersURLs[_participant][_phase];
    }

    function getParticipants() public view returns (address[]) {
      return participants;
    }

    function payWinner(uint amount) public onlyOwner returns(bool) {
         require(amount < address(this).balance);
         owner.transfer(amount);
         return true;
         // how to account for gas ??

     }

}
