import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Loader from "../Component/Loader";
import "./css/votingpoll.css";

function Attestations(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const [candidates, setCandidates] = useState([
    { name: "", walletAddress: "", image: null },
  ]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCandidateChange = (index, field, value) => {
    const newCandidates = [...candidates];
    newCandidates[index][field] = value;
    setCandidates(newCandidates);
  };

  const handleImageChange = (index, files) => {
    const newCandidates = [...candidates];
    newCandidates[index].image = files[0];
    setCandidates(newCandidates);
  };

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { name: "", walletAddress: "", image: null },
    ]);
  };

  const removeCandidate = (index) => {
    const newCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(newCandidates);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Election name is required";
    if (!formData.description)
      newErrors.description = "Election description is required";

    candidates.forEach((candidate, index) => {
      if (!candidate.name)
        newErrors[`candidateName${index}`] = "Candidate name is required";
      if (!candidate.walletAddress)
        newErrors[`candidateWallet${index}`] = "Wallet address is required";
      if (!candidate.image)
        newErrors[`candidateImage${index}`] = "Image is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const selectedAccount = accounts[0];
      const candidateNames = candidates.map((person) => person.name);
      const candidateWalletAddresses = candidates.map(
        (person) => person.walletAddress
      );
      const candidatePhotos = candidates.map((person) => person.image);
      const time1 = new Date(formData.startTime);
      const time2 = new Date(formData.endTime);
      const startTimestamp = Math.floor(time1.getTime() / 1000);
      const endTimestamp = Math.floor(time2.getTime() / 1000);

      try {
        let photos = [];
        for (let i = 0; i < candidatePhotos.length; i++) {
          //   console.log(candidatePhotos[i]);
          const res = await Axios({
            method: "POST",
            url: "http://localhost:4001/api/photos",
            data: {
              photo: candidatePhotos[i],
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          photos.push(res.data.data._id);
        }
        //   console.log(
        //     formData.name,
        //     formData.description,
        //     candidateNames,
        //     candidateWalletAddresses,
        //     startTimestamp,
        //     endTimestamp,
        //     // photos,
        //     selectedAccount
        //   );
        let res = await props.createElection(
          formData.name,
          formData.description,
          startTimestamp,
          endTimestamp,
          candidateWalletAddresses,
          candidateNames,
          photos,
          selectedAccount
        );
        if (res === true) {
          alert("Election Created Successfully!");
          navigate("/voting");
        }
      } catch (error) {
        alert(
          "An unexpected error occurred! Check console for more information"
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="voting-poll-content">
      {loading && <Loader />}
      <div className="voting-poll-container">
        <div className="voting-title">Create Poll</div>
        <div>
          Creating an election poll involves setting up a secure and transparent
          voting system where participants can cast their votes, with results
          being automatically tallied and verified on the blockchain.
        </div>

        <div className="attestation-form-container">
          <h2>Election Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="attestation-form-group">
              <label htmlFor="name">Election Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter election name"
                value={formData.name}
                onChange={handleChange}
                className="name"
              />
              {errors.name && (
                <span className="attestation-error">{errors.name}</span>
              )}
            </div>
            <div className="attestation-form-group">
              <label htmlFor="description">Election Description</label>
              <textarea
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description here..."
              />
              {errors.description && (
                <span className="attestation-error">{errors.description}</span>
              )}
            </div>
            <div className="attestation-form-group">
              <label htmlFor="startTime">Start Time:</label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="name"
              />
              {/* {errors.name && (
                <span className="attestation-error">{errors.name}</span>
              )} */}
            </div>
            <div className="attestation-form-group">
              <label htmlFor="endTime">End Time:</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="name"
              />
              {/* {errors.name && (
                <span className="attestation-error">{errors.name}</span>
              )} */}
            </div>

            <h2 className="can-main-top">Candidate Details</h2>
            {candidates.map((candidate, index) => (
              <div key={index} className="candidate-section">
                <h2 className="candidate-count">Candidate {index + 1}</h2>
                <div className="attestation-form-row">
                  <div className="attestation-form-group">
                    <label htmlFor={`candidateName${index}`}>
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      id={`candidateName${index}`}
                      name={`candidateName${index}`}
                      placeholder="Enter candidate name"
                      value={candidate.name}
                      onChange={(e) =>
                        handleCandidateChange(index, "name", e.target.value)
                      }
                    />
                    {errors[`candidateName${index}`] && (
                      <span className="attestation-error">
                        {errors[`candidateName${index}`]}
                      </span>
                    )}
                  </div>
                  <div className="attestation-form-group">
                    <label htmlFor={`candidateWallet${index}`}>
                      Candidate Wallet Address
                    </label>
                    <input
                      type="text"
                      id={`candidateWallet${index}`}
                      name={`candidateWallet${index}`}
                      placeholder="Enter candidate wallet address"
                      value={candidate.walletAddress}
                      onChange={(e) =>
                        handleCandidateChange(
                          index,
                          "walletAddress",
                          e.target.value
                        )
                      }
                    />
                    {errors[`candidateWallet${index}`] && (
                      <span className="attestation-error">
                        {errors[`candidateWallet${index}`]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="attestation-form-row image-upload">
                  <div className="attestation-form-group image-upload">
                    <label htmlFor={`candidateImage${index}`}>
                      Select Candidate Image
                    </label>
                    <input
                      type="file"
                      id={`candidateImage${index}`}
                      name={`candidateImage${index}`}
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => handleImageChange(index, e.target.files)}
                    />
                    <label
                      htmlFor={`candidateImage${index}`}
                      className="custom-file-upload"
                    >
                      {candidate.image ? candidate.image.name : "Select Image"}
                    </label>
                    {errors[`candidateImage${index}`] && (
                      <span className="attestation-error">
                        {errors[`candidateImage${index}`]}
                      </span>
                    )}
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCandidate(index)}
                    className="attestation-candidate-add attestation-candidate-remove"
                  >
                    Remove Candidate
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addCandidate}
              className="attestation-candidate-add"
            >
              Add Candidate
            </button>

            <button type="submit" className="attestation-confirm-btn">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Attestations;
