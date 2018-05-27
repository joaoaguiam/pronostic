pragma solidity ^0.4.21;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract WCwagers is Ownable {
    uint constant internal USDTOWEI  = 1666666666666666
    // 600$ is 1 ETH, but 1 ETH is on 18 digits so 1'000'000'000'000'000'000 / 600 = 166666666666666
    enum Phase {Group, Round16, Quarters, Semis, Finals};
    mapping (Phase => uint) phaseDates;
    phaseDates[Group] = 1529010000;
    phaseDates[Round16] = 1530388800;
    phaseDates[Quarters] = 1530907200;
    phaseDates[Semis] = 1531267200;
    phaseDates[Finals] = 1531598400; // unix epoch dates for submission deadline
    string contestName;
    uint public wagerSize;
    uint public potSize;
    address[] public participants;
    // this maps the participants to a mapping of phase and URLs
    mapping (address => mapping(Phase => string)) usersURLs private;


    // constuctor takes in input the name of the contest (e.g. NagraStar, soccerNuts) and wager size in USD.
    // The wager size will be converted to Ether using a fixed value
    function WCwagers(string _name, uint _wagerSize) public {
        wagerSize = _wagerSize * USDTOWEI;
        contestName = _name;
    }

    function getWagerSize() public pure returns uint {
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

    modifier isThereTime(Phase _phase) {
        require(phaseDates[_phase] <= block.timestamp);
        _;
    }

    modifier isItTimeYet(Phase _phase) {
        require(phaseDates[_phase] >= block.timestamp);
        _;
    }


    function writeURL(string _URL, Phase _phase) public isThereTime(_phase) {
      usersURLs[msg.sender][_phase]=_URL;
    }
// Does it make sense to have this function?
// If I want to retrieve my URLs before the deadline, this is what I'd use
    function getOwnURL(Phase _phase) public returns string {
      return[msg.sender][_phase];
    }

    function getURL(address _participant, Phase _phase) public returns string isItTimeYet(_phase) {
      return usersURLs[_participant][_phase];
    }

    function getParticipants() public pure returns address[] {
      return participants;
    }

    function payWinner(uint amount) onlyOwner returns(bool) {
         require(amount < this.balance);
         owner.transfer(amount);
         return true;
         // how to account for gas ??

     }

}
