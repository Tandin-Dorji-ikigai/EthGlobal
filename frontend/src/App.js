import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Home from "./Pages/Home";
import Voting from "./Pages/Voting";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Voting2 from "./Pages/Voting2";
import Attestations from "./Pages/Attestation";
import CreatePolls from "./Pages/CreatePolls";
import UserAttestations from "./Pages/UserAttestation";
import { VOTEXCHAIN_ABI, VOTEXCHAIN_ADDRESS } from "./Abi/VotexChain";
import Web3 from "web3";

function App() {
  const [contract, setContract] = useState(null);
  const [elections, setElections] = useState([]);
  // const [isAdmin, setIsAdmin] = useState(false);

  const createElection = async (name, description, startTime, endTime, candidateAddresses, candidateNames, candidatePhotos, caller) => {
    try {
      const receipt = await contract.methods.createElection(name, description, startTime, endTime, candidateAddresses, candidateNames, candidatePhotos).send({ from: caller });
      console.log(receipt);
      return true;
    } catch (error) {
      alert("An error occurred! Check your console for more details");
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || 'HTTP://127.0.0.1:8545');
        const votexchain = new web3.eth.Contract(VOTEXCHAIN_ABI, VOTEXCHAIN_ADDRESS);
        setContract(votexchain)
        const electionCount = await votexchain.methods.electionCount().call();
        const electionArray = [];

        for (let i = 1; i <= electionCount; i++) {
          const tx = await votexchain.methods.elections(i).call();
          electionArray.push(tx);
        }

        setElections(electionArray);
        console.log(electionArray);
      } catch (error) {
        console.log(error)
      }
    };
    console.log("Loading blockchain data...");
    loadBlockchainData();
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attestations" element={<Attestations />} />
          <Route path="/createPolls" element={<CreatePolls createElection={createElection} />} />
          <Route path="/voting" element={<Voting elections={elections} />} />
          <Route path="/voting2" element={<Voting2 contract={contract} />} />
          <Route path="/userAttestations" element={<UserAttestations />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
