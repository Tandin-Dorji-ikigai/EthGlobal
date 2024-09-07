// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract VotexChain {
    struct Election {
        string name;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool active;
        address[] candidates;
        mapping(bytes32 => bool) hasVoted; // Hashes of voters to check if they voted
        mapping(address => uint256) votes; // Votes per candidate
    }

    mapping(uint256 => Election) public elections;
    mapping(address => string) public candidatePhotos; // Store photo URLs for candidates
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
        string description,
        uint256 startTime,
        uint256 endTime,
        address[] candidates
    );
    event VoteCast(uint256 electionId, address candidate);
    event ElectionEnded(uint256 electionId);

    constructor() {
        admin = msg.sender;
    }

    function createElection(
        string memory _name,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime,
        address[] memory _candidates,
        string[] memory _photoURLs // New parameter for photo URLs
    ) public onlyAdmin {
        require(_startTime < _endTime, "Start time must be before end time");
        require(
            _candidates.length == _photoURLs.length,
            "Each candidate must have a photo URL"
        );

        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.name = _name;
        newElection.description = _description;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.candidates = _candidates;
        newElection.active = true;

        // Store each candidate's photo URL
        for (uint256 i = 0; i < _candidates.length; i++) {
            candidatePhotos[_candidates[i]] = _photoURLs[i];
        }

        emit ElectionCreated(
            electionCount,
            _name,
            _description,
            _startTime,
            _endTime,
            _candidates
        );
    }

    // Voter submits a hashed vote to maintain anonymity
    function vote(
        uint256 electionId,
        address candidate
    ) public electionActive(electionId) {
        Election storage election = elections[electionId];

        // Generate a unique hash using the voter's address and election ID
        bytes32 voteHash = keccak256(abi.encodePacked(msg.sender, electionId));

        require(!election.hasVoted[voteHash], "You have already voted");
        require(checkValidCandidate(electionId, candidate), "Invalid candidate");

        election.votes[candidate]++;
        election.hasVoted[voteHash] = true; // Mark voter as voted with hash

        emit VoteCast(electionId, candidate);
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
            if (elections[electionId].candidates[i] == candidate) {
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

    // Get the photo URL of a candidate
    function getCandidatePhoto(address candidate) public view returns (string memory) {
        return candidatePhotos[candidate];
    }
}
