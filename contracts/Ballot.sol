// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Ballot{
    // Voters
    struct Voter{
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }

    // Proposal
    struct Proposal{
        bytes32 name;
        uint voteCount;
    }

    address public chairpersion;

    // map voters address to specific voter
    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    constructor(bytes32[] memory proposalNames){
        chairpersion = msg.sender;
        voters[chairpersion].weight = 1;

        for (uint256 i = 0; i < proposalNames.length; i++){
            proposals.push(
                Proposal({
                    name:proposalNames[i],
                    voteCount:0
                })
            );
        }
    }
    function stringToBytes32(string memory source) public pure returns (bytes32 result) { 
        bytes memory tempEmptyStringTest = bytes(source); 
        if (tempEmptyStringTest.length == 0) { 
            return 0x0; 
        } 
        assembly { 
            result := mload(add(source, 32)) 
        } 
    }

    function giveRightToVote(address voter) external {
        require(msg.sender == chairpersion,"only chairman gives right to vote");
        require(!voters[voter].voted,"You have already voted");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function delegate(address to) external{
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0,"You dont have voting rights");
        require(to != msg.sender,"self-delegation is not allowed");
        while (voters[to].delegate != address(0)){
            to = voters[to].delegate;
            require(to != msg.sender,"Found loop in delegation");
        } 
        Voter storage delegate_ = voters[to];
        require(delegate_.weight >= 1);

        sender.voted = true;
        sender.delegate = to;

        if (delegate_.voted){
            proposals[delegate_.vote].voteCount += sender.weight;
        }else{
            delegate_.weight += sender.weight;
        }
    }

    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0,"You dont have voting rights");
        require(!sender.voted,"You have already vote");
        sender.voted = true;
        sender.vote = proposal;

        proposals[proposal].voteCount += sender.weight;
    }

    function winningProposal() public view returns (uint winningProposal_){
        uint winningVoteCount = 0;
        for (uint256 i = 0; i < proposals.length; i++) {
            if(proposals[i].voteCount > winningVoteCount){
                winningVoteCount = proposals[i].voteCount;
                winningProposal_ = i;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_){
        winnerName_ = proposals[winningProposal()].name;
    }
}