const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("VotexChain", function () {
  async function deployVotexChainFixture() {
    const [admin, voter1, voter2, candidate1, candidate2] = await ethers.getSigners();

    const VotexChain = await ethers.getContractFactory("VotexChain");
    const votexChain = await VotexChain.deploy();

    return { votexChain, admin, voter1, voter2, candidate1, candidate2 };
  }

  describe("Deployment", function () {
    it("Should set the correct admin", async function () {
      const { votexChain, admin } = await loadFixture(deployVotexChainFixture);
      expect(await votexChain.admin()).to.equal(admin.address);
    });
  });

  describe("Creating an Election", function () {
    it("Should create an election with valid parameters", async function () {
      const { votexChain, admin, candidate1, candidate2 } = await loadFixture(deployVotexChainFixture);
      const candidates = [candidate1.address, candidate2.address];
      const startTime = await time.latest() + 60; // Starts in 60 seconds
      const endTime = startTime + 3600; // Ends in 1 hour

      await votexChain.connect(admin).createElection("Election 1", startTime, endTime, candidates);
      const election = await votexChain.elections(1); // Since electionCount starts at 1
      expect(election.name).to.equal("Election 1");
      expect(election.active).to.be.true;
      expect(election.startTime).to.equal(startTime);
      expect(election.endTime).to.equal(endTime);
    });

    it("Should revert if non-admin tries to create an election", async function () {
      const { votexChain, voter1, candidate1, candidate2 } = await loadFixture(deployVotexChainFixture);
      const candidates = [candidate1.address, candidate2.address];
      const startTime = await time.latest() + 60;
      const endTime = startTime + 3600;

      await expect(
        votexChain.connect(voter1).createElection("Election 1", startTime, endTime, candidates)
      ).to.be.revertedWith("Only admin can perform this action");
    });
  });

  describe("Voting Process", function () {
    async function setupElectionFixture() {
      const { votexChain, admin, voter1, voter2, candidate1, candidate2 } = await loadFixture(deployVotexChainFixture);
      const candidates = [candidate1.address, candidate2.address];
      const startTime = await time.latest() + 60;
      const endTime = startTime + 3600;

      await votexChain.connect(admin).createElection("Election 1", startTime, endTime, candidates);

      return { votexChain, admin, voter1, voter2, candidate1, candidate2, startTime, endTime };
    }

    it("Should allow a voter to vote for a valid candidate", async function () {
      const { votexChain, voter1, candidate1, startTime } = await loadFixture(setupElectionFixture);

      await time.increaseTo(startTime);

      await votexChain.connect(voter1).vote(1, candidate1.address);

      const votes = await votexChain.getVotes(1, candidate1.address);
      expect(votes).to.equal(1);
    });

    it("Should revert if a voter tries to vote more than once", async function () {
      const { votexChain, voter1, candidate1, startTime } = await loadFixture(setupElectionFixture);

      await time.increaseTo(startTime);

      await votexChain.connect(voter1).vote(1, candidate1.address);

      await expect(
        votexChain.connect(voter1).vote(1, candidate1.address)
      ).to.be.revertedWith("You have already voted");
    });

    it("Should revert if voting for an invalid candidate", async function () {
      const { votexChain, voter1, voter2, startTime } = await loadFixture(setupElectionFixture);

      await time.increaseTo(startTime);

      await expect(
        votexChain.connect(voter1).vote(1, voter2.address)
      ).to.be.revertedWith("Invalid candidate");
    });

    it("Should revert if voting before the election starts", async function () {
      const { votexChain, voter1, candidate1, startTime } = await loadFixture(setupElectionFixture);

      await expect(
        votexChain.connect(voter1).vote(1, candidate1.address)
      ).to.be.revertedWith("Election has not started yet");
    });

    it("Should revert if voting after the election ends", async function () {
      const { votexChain, voter1, candidate1, endTime } = await loadFixture(setupElectionFixture);

      await time.increaseTo(endTime + 1);

      await expect(
        votexChain.connect(voter1).vote(1, candidate1.address)
      ).to.be.revertedWith("Election has ended");
    });

    it("Should emit an event when an election ends", async function () {
      const { votexChain, admin, startTime, endTime } = await loadFixture(setupElectionFixture);

      await time.increaseTo(endTime);

      await expect(votexChain.connect(admin).endElection(1))
        .to.emit(votexChain, "ElectionEnded")
        .withArgs(1);
    });
  });
});
