// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VotexChain {
    struct Election {
        string name;
        uint256 startTime;
        uint256 endTime;
        bool active;
        address[] candidates;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) votes;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionActive(uint256 electionId) {
        require(elections[electionId].active, "Election is not active");
        require(
            block.timestamp >= elections[electionId].startTime,
            "Election has not started yet"
        );
        require(
            block.timestamp <= elections[electionId].endTime,
            "Election has ended"
        );
        _;
    }

    event ElectionCreated(
        uint256 electionId,
        string name,
        uint256 startTime,
        uint256 endTime,
        address[] candidates
    );
    event VoteCast(uint256 electionId, address candidate, address voter);
    event ElectionEnded(uint256 electionId);

    constructor() {
        admin = msg.sender;
    }

    function createElection(
        string memory _name,
        uint256 _startTime,
        uint256 _endTime,
        address[] memory _candidates
    ) public onlyAdmin {
        require(_startTime < _endTime, "Start time must be before end time");
        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.name = _name;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.candidates = _candidates;
        newElection.active = true;

        emit ElectionCreated(
            electionCount,
            _name,
            _startTime,
            _endTime,
            _candidates
        );
    }

    function vote(
        uint256 electionId,
        address candidate
    ) public electionActive(electionId) {
        Election storage election = elections[electionId];

        require(!election.hasVoted[msg.sender], "You have already voted");
        require(checkElectionEnded(electionId), "Voting has ended");
        require(
            checkValidCandidate(electionId, candidate),
            "Invalid candidate"
        );

        election.votes[candidate]++;
        election.hasVoted[msg.sender] = true;

        emit VoteCast(electionId, candidate, msg.sender);
    }

    function endElection(uint256 electionId) public onlyAdmin {
        Election storage election = elections[electionId];
        require(election.active, "Election is already inactive");
        election.active = false;

        emit ElectionEnded(electionId);
    }

    // Check if candidate exists
    function checkValidCandidate(
        uint256 electionId,
        address candidate
    ) public view returns (bool) {
        bool validCandidate = false;
        for (uint256 i = 0; i < elections[electionId].candidates.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(elections[electionId].candidates[i])
                ) == keccak256(abi.encodePacked(candidate))
            ) {
                validCandidate = true;
                break;
            }
        }
        return validCandidate;
    }

    function checkElectionEnded(uint256 electionId) public view returns (bool) {
        return elections[electionId].endTime > block.timestamp;
    }

    function getVotes(
        uint256 electionId,
        address candidate
    ) public view returns (uint256) {
        return elections[electionId].votes[candidate];
    }
}
