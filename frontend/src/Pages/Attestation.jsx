import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from "@ethsign/sp-sdk";
import "./css/votingpoll.css";

const client = new SignProtocolClient(SpMode.OffChain, {
  signType: OffChainSignType.EvmEip712,
  chain: EvmChains.baseSepolia,
});
function Attestations() {
  const [loading, setLoading] = useState(false);
  const [account, setSelectedAcc] = useState("");
  const [exists, setExists] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    cid: "",
    address: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function checkAttestationExists() {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      setSelectedAcc(selectedAccount);
      const res = await Axios.get("http://localhost:4001/api/users");
      const attestation = res.data.data;
      // Check if any user has the same wallet address as the selected account
      const attestationExists = attestation.find(
        (user) =>
          user.walletAddress.toLowerCase() === selectedAccount.toLowerCase()
      );
      setLoading(false);
      if (attestationExists !== undefined) {
        setExists(true);
      }
    }
    checkAttestationExists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.cid) newErrors.cid = "CID is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const attestationInfo = await client.createAttestation({
          schemaId: "SPS_J_bYOcsgqy8b_rsstO2TC",
          data: {
            Fullname: formData.fullName,
            CID: formData.cid,
            Address: formData.address,
            "Date of Birth": formData.dob,
            Signer: account, // signer address
          },
          indexingValue: account.toLowerCase(), // indexingValue: signer.toLowerCase()
        });
        const res = await Axios({
          url: "http://localhost:4001/api/users",
          method: "POST",
          data: {
            walletAddress: account,
            attestation_id: attestationInfo.attestationId,
          },
        });
        console.log("Attestation created: ", res.data.data);
        alert("Attestation created successfully!");
        setExists(true);
      } catch (error) {
        alert("Error creating attestation. Check your console and try again");
        console.log(error);
      }
    }
  };

  return (
    <div className="voting-poll-content">
      {loading && console.log("loading")}
      <div className="voting-poll-container">
        <div className="voting-title">Create Attestations</div>
        <div>
          Creating attestation involves generating a secure, verifiable proof of
          identity or action on the blockchain, ensuring authenticity and trust.
        </div>
        {!exists ? (
          <div className="attestation-form-container">
            <h2>Attestation Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="attestation-form-row">
                <div className="attestation-form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <span className="attestation-error">{errors.fullName}</span>
                  )}
                </div>
                <div className="attestation-form-group">
                  <label htmlFor="cid">CID</label>
                  <input
                    type="text"
                    id="cid"
                    name="cid"
                    placeholder="Enter your cid"
                    value={formData.cid}
                    onChange={handleChange}
                  />
                  {errors.cid && (
                    <span className="attestation-error">{errors.cid}</span>
                  )}
                </div>
              </div>
              <div className="attestation-form-row">
                <div className="attestation-form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="attestation-error">{errors.address}</span>
                  )}
                </div>
                <div className="attestation-form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <span className="attestation-error">{errors.dob}</span>
                  )}
                </div>
              </div>
              <button type="submit" className="attestation-confirm-btn">
                Confirm
              </button>
            </form>
          </div>
        ) : (
          <div className="attestation-form-container">
            <h1>
              You have already created an attestation. You can now cast votes in
              any elections
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attestations;
