pragma solidity ^0.4.22;

import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";
//import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";


contract WCwagers is Ownable {
    uint constant internal USDTOWEI  = 1666666666666666;
    // 600$ is 1 ETH, but 1 ETH is on 18 digits so 1'000'000'000'000'000'000 / 600 = 166666666666666
    // enum Phase {Group, Round16, Quarters, Semis, Finals}
    //mapping (Phase => uint) phaseDates; //cannot use enum in mapping
    mapping (string => uint) phaseDates;
    mapping (address => string) public participantsNames;
    string contestName;
    uint public wagerSize;
    uint public potSize;
    address[] participants;
    // this maps the participants to a mapping of phase (string for phase enum) and URLs
    mapping (address => mapping(string => string)) private usersURLs;

    // constuctor takes in input the name of the contest (e.g. NagraStar, soccerNuts) and wager size in USD.
    // The wager size will be converted to Ether using a fixed value
    constructor(string _name, uint _wagerSize) public {
        wagerSize = _wagerSize * USDTOWEI;
        contestName = _name;

        phaseDates["Group"] = 1528991100; // 06/14/2018 15:45:00 UTC - 15 minutes before start of first group match
        phaseDates["Round16"] = 1530366300; // 06/30/2018 13:45:00 UTC - 15 minutes before start round of 16
        phaseDates["Quarters"] = 1530884700; // Friday, July 6, 2018 1:45:00 PM - 15 minutes before quarters
        phaseDates["Semis"] = 1531244700; // Tuesday, July 10, 2018 5:45:00 PM - 15 minutes before semis
        phaseDates["Finals"] = 1531575900; // Saturday, July 14, 2018 1:45:00 PM - 15 minutes before 3rd place match
    }

    function toggleTimePast() public onlyOwner {
      phaseDates["Group"] = 1527389672; // for testing, put this in the past
      emit DebugStr("Group date put in the past");
    }

    function getContestInfo() public view returns (uint _wagerSize, string _contestName, uint _firstPhaseDate) {
        return (wagerSize, contestName, phaseDates["Group"]);
    }

    function getWagerSize() public view returns (uint) {
      return wagerSize;
    }

    function registerParticipant(string nickname) public payable isValidRegistration(msg.sender) {
        participants.push(msg.sender);
        participantsNames[msg.sender] = nickname;
        emit ParticipantAdded(msg.sender);
    }
    event ParticipantAdded(address participant);
    event DebugStr(string value);
    event DebugInt(uint value);

    /* function compareStrings (string a, string b) pure internal returns (bool){
      if(bytes(a).length != bytes(b).length) {
        return false;
        } else
        {
            return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
        }
       } */

    modifier isValidRegistration(address _participant) {
        require(msg.value >= wagerSize);
        require(bytes(participantsNames[_participant]).length == 0);
        _;
    }

    modifier isThereTime(string _phase) {
    //  emit DebugInt(phaseDates[_phase]);
    //  emit DebugInt(block.timestamp);
        require(phaseDates[_phase] >= block.timestamp);
        _;
    }
    /* modifier isPhaseValid(string _phase) {
      //require(compareStrings(_phase,"Group"));
      require(compareStrings(_phase,"Group") || compareStrings(_phase,"Round16") || compareStrings(_phase,"Quarters") || compareStrings(_phase,"Semis") || compareStrings(_phase,"Finals"));
        _;
    } */

    modifier isItTimeYet(string _phase) {
        require(phaseDates[_phase] <= block.timestamp);
        _;
    }

    function writeURL(string _URL, string _phase) public isThereTime(_phase) {
      usersURLs[msg.sender][_phase]=_URL;
    }
// Does it make sense to have this function?
// If I want to retrieve my URLs before the deadline, this is what I'd use
    function getOwnURL(string _phase) public view returns (string) {
      //emit DebugStr("phase");
      //emit DebugStr(_phase);
      //emit DebugStr("Stored URL");
      //emit DebugStr(usersURLs[msg.sender][_phase]);
      return usersURLs[msg.sender][_phase];
    }

    function getURL(address _participant, string _phase) public view isItTimeYet(_phase) returns (string) {
      return usersURLs[_participant][_phase];
    }

    function getParticipants() public view returns (address[]) {
      return participants;
    }

    function getNickname(address _participant) public view returns (string) {
      return participantsNames[_participant];
    }

    function payWinner(uint _amount, address _payee) public onlyOwner {
      emit DebugStr("Amount in param");
      emit DebugInt(_amount);
      emit DebugStr("Amount in contract");
      emit DebugInt(address(this).balance);
  //    require(_amount <= address(this).balance); // probably already handled by intrinsic mechanism
      require(bytes(participantsNames[_payee]).length > 0);
      _payee.transfer(_amount);

     }

}
