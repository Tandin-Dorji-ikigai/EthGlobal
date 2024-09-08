import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { X } from "lucide-react";
import "./css/votingpoll.css";

const privKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const client = new SignProtocolClient(SpMode.OffChain, {
  signType: OffChainSignType.EvmEip712,
  chain: EvmChains.baseSepolia,
  account: privateKeyToAccount(privKey),
});

// Popup component
const AttestationPopup = ({ attestation, onClose }) => {
  const [attestationDetails, setAttestationDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch attestation details when the component mounts
    async function fetchAttestationDetails() {
      try {
        setLoading(true);
        const res = await client.getAttestation(attestation.attestation_id);
        const attestationData = JSON.stringify(res, null, 2);
        const attestationDetails = JSON.parse(attestationData);
        setAttestationDetails(attestationDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attestation details", error);
      }
    }

    fetchAttestationDetails();
  }, [attestation]);

  return (
    <div className="attestation-popup-overlay">
      {loading && console.log("Attestation loading...")}
      {attestationDetails && (
        <div className="attestation-popup">
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
          <h2>User Attestation</h2>
          <p className="attestation-id">{attestation.walletAddress}</p>

          <div className="attestation-row">
            <div className="attestation-column">
              <p>Full Name</p>
              <p>{attestationDetails.data.Fullname}</p>
            </div>
            <div className="attestation-column">
              <p>Address</p>
              <p>{attestationDetails.data.Address}</p>
            </div>
          </div>

          <div className="attestation-row">
            <div className="attestation-column">
              <p>CID</p>
              <p>{attestationDetails.data.CID}</p>
            </div>
            <div className="attestation-column">
              <p>Date of Birth</p>
              <p>{attestationDetails.data["Date of Birth"]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function UserAttestations() {
  const [attestations, setAttestations] = useState([]);
  const [selectedAttestation, setSelectedAttestation] = useState(null);

  useEffect(() => {
    async function getAttestations() {
      const usersRes = await Axios.get("http://localhost:4001/api/users");
      setAttestations(usersRes.data.data);
    }
    getAttestations();
  }, []);

  const handleViewAttestation = (attestation) => {
    setSelectedAttestation(attestation);
  };

  const handleRevokeAttestation = async (attestation) => {
    try {
      const revokeAttestationRes = await client.revokeAttestation(
        attestation.attestation_id,
        {
          reason: "Invalid Attestation",
        }
      );
      console.log("Revoke attestation response:", revokeAttestationRes);
      const res = await Axios.delete(
        `http://localhost:4001/api/users/${attestation._id}`
      );
      console.log("Attestation removed from db:", res);
      alert("Attestation Revoked Successfully");
      window.location.reload(true);
    } catch (error) {
      alert("Unexpected error occured! Check console for more details");
      console.log(error);
    }
  };

  const handleClosePopup = () => {
    setSelectedAttestation(null);
  };

  return (
    <div className="voting-poll-content">
      <div className="voting-poll-container">
        <div className="voting-title">User Attestations</div>
        <div>
          Using the advanced Sign Protocol, VotexChain guarantees that only
          verified voters can participate. This eliminates the risk of
          fraudulent votes or impersonation.
        </div>
      </div>

      <div className="userAttestations-wrapper">
        {attestations.map((attestation) => (
          <div key={attestation.attestation_id} className="userAttestations">
            <p>{attestation.walletAddress}</p>
            <div className="userAssBtns">
              <button onClick={() => handleViewAttestation(attestation)}>
                View Attestation
              </button>
              <button onClick={() => handleRevokeAttestation(attestation)}>
                Revoke Attestation
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAttestation && (
        <AttestationPopup
          attestation={selectedAttestation}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default UserAttestations;
