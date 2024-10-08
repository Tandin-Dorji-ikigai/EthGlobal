import React, { useState, useEffect } from "react";
import "./css/Voting.css";
import Axios from "axios";
import Swal from "sweetalert2"; 

function Voting2(props) {
  const [election, setElection] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [voteCounts, setVoteCounts] = useState([]);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    async function getElectionDetails() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      if (selectedAccount === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase()) {
        setIsAdmin(true);
      }
      const res = await props.contract.methods
        .getElectionDetails(pollId)
        .call({ from: selectedAccount });
      setElection(res);

      let electionCandidates = [];
      let electionVoteCounts = [];

      for (let i = 0; i < res[5].length; i++) {
        const name = await props.contract.methods
          .getCandidateName(res[5][i])
          .call({ from: selectedAccount });
        const photo = await props.contract.methods
          .getCandidatePhoto(res[5][i])
          .call({ from: selectedAccount });
        const photoRes = await Axios.get(
          `http://localhost:4001/api/photos/${photo}`
        );

        electionCandidates.push([name, photoRes.data.data.photo, res[5][i]]);

        // Fetch the vote counts for each candidate
        const voteCount = await props.contract.methods
          .getVotes(pollId, res[5][i])
          .call({ from: selectedAccount });
        electionVoteCounts.push(voteCount); // Store the vote count
      }
      setCandidates(electionCandidates);
      setVoteCounts(electionVoteCounts); // Store vote counts in state
    }
    const pollId = getCookie("pollId");
    if (pollId) {
      props.contract && getElectionDetails();
    }
  }, [props.contract]);

  function formatUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const handleVote = async (addr) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      const res = await Axios.get("http://localhost:4001/api/users");
      const attestation = res.data.data;

      const attestationExists = attestation.find(
        (user) =>
          user.walletAddress.toLowerCase() === selectedAccount.toLowerCase()
      );
      if (attestationExists === undefined) {
        return Swal.fire("Error", "You must create an attestation to be eligible for casting votes", "error");
      }

      const pollId = getCookie("pollId");
      const electionDetails = await props.contract.methods
        .getElectionDetails(pollId)
        .call({ from: selectedAccount });
      console.log(electionDetails);
      const hasVoted = await props.contract.methods
        .getHasVoted(selectedAccount, pollId)
        .call({ from: selectedAccount });
      const currTime = new Date(Date.now());
      const currTimestamp = Math.floor(currTime.getTime() / 1000);
      if (Number(electionDetails[2]) >= currTimestamp) {
        return Swal.fire("Error", "The poll has not started yet so you cannot vote.", "warning");
      }
      if (hasVoted) {
        return Swal.fire("Error", "You have already voted!", "warning");
      }
      const receipt = await props.contract.methods
        .vote(pollId, addr)
        .send({ from: selectedAccount });
      console.log(receipt);
      Swal.fire("Success", "Voted Successfully", "success");
    } catch (error) {
      if (error.name === "ContractExecutionError") {
        return Swal.fire("Error", "Smart Contract conditions do not meet!", "error");
      }
      Swal.fire("Error", "An error occurred! Check your console for more details", "error");
      console.log(error);
    }
  };

  const closeElection = async () => {
    const pollId = getCookie("pollId");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const selectedAccount = accounts[0];
    const receipt = await props.contract.methods
      .endElection(pollId)
      .send({ from: selectedAccount });
    console.log(receipt);
    Swal.fire({
      title: "Success",
      text: "Election Closed Successfully",
      icon: "success",
    }).then(() => {
      window.location.reload(true);
    });
  };

  return (
    <>
      {election && (
        <div>
          <div className="voting-banner">
            <div className="voting-banner-content">
              <p>{election[4] ? "Open" : "Closed"} Poll</p>
              <p>{election[0]}</p>
              <p>{election[1]}</p>
              <p className="white">
                Start Time: {formatUnixTimestamp(Number(election[2]))}
              </p>
              <p className="white">
                End Time: {formatUnixTimestamp(Number(election[3]))}
              </p>
              {isAdmin && election[4] && (
                <p>
                  <button
                    className="close-election-btn"
                    onClick={() => closeElection()}
                  >
                    Close Election
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="voting-candidates">
            <p className="candi-topic">Candidates</p>
            <div className="candidate-wrapper">
              {candidates.map((candidate, index) => (
                <div className="candidate-container" key={index}>
                  <div className="candidate-content1">
                    <div className="cand-img-container">
                      <img
                        src={`http://localhost:4001/api/${candidate[1]}`}
                        alt={candidate[0]}
                      />
                    </div>
                  </div>
                  <div className="candidate-content2">
                    <p className="cand-name">{candidate[0]}</p>
                  </div>
                  <div className="candidate-content3">
                    {!election[4] || isAdmin ? (
                      <div className="vote-counts">
                        <p className="vote-count">
                          {Number(voteCounts[index])} VOTES
                        </p>
                      </div>
                    ) : (
                      <button
                        className="vote-btn"
                        onClick={() => handleVote(candidate[2])}
                      >
                        Vote
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Voting2;
