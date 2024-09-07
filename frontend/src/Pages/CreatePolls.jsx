import React, { useState } from 'react';
import './css/votingpoll.css';

function Attestations() {
    const [formData, setFormData] = useState({
        electionName: '',
        electDes: '',
    });

    const [candidates, setCandidates] = useState([
        { name: '', walletAddress: '', image: null }
    ]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
        setCandidates([...candidates, { name: '', walletAddress: '', image: null }]);
    };

    const removeCandidate = (index) => {
        const newCandidates = candidates.filter((_, i) => i !== index);
        setCandidates(newCandidates);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.electionName) newErrors.electionName = 'Election name is required';
        if (!formData.electDes) newErrors.electDes = 'Election description is required';

        candidates.forEach((candidate, index) => {
            if (!candidate.name) newErrors[`candidateName${index}`] = 'Candidate name is required';
            if (!candidate.walletAddress) newErrors[`candidateWallet${index}`] = 'Wallet address is required';
            if (!candidate.image) newErrors[`candidateImage${index}`] = 'Image is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', { ...formData, candidates });
            alert('Form submitted successfully!');
        }
    };

    return (
        <div className="voting-poll-content">
            <div className="voting-poll-container">
                <div className="voting-title">Create Poll</div>
                <div>
                    Creating an election poll involves setting up a secure and transparent voting system where participants can cast their votes, with results being automatically tallied and verified on the blockchain.
                </div>

                <div className="attestation-form-container">
                    <h2>Election Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="attestation-form-group">
                            <label htmlFor="electionName">Election Name</label>
                            <input
                                type="text"
                                id="electionName"
                                name="electionName"
                                placeholder='Enter election name'
                                value={formData.electionName}
                                onChange={handleChange}
                                className='electionName'
                            />
                            {errors.electionName && <span className="attestation-error">{errors.electionName}</span>}
                        </div>
                        <div className="attestation-form-group">
                            <label htmlFor="electDes">Election Description</label>
                            <textarea
                                id="electDes"
                                name="electDes"
                                rows="6"
                                value={formData.electDes}
                                onChange={handleChange}
                                placeholder="Enter description here..."
                            />
                            {errors.electDes && <span className="attestation-error">{errors.electDes}</span>}
                        </div>

                        <h2 className='can-main-top'>Candidate Details</h2>
                        {candidates.map((candidate, index) => (
                            <div key={index} className="candidate-section">
                                <h2 className='candidate-count'>Candidate {index + 1}</h2>
                                <div className="attestation-form-row">
                                    <div className="attestation-form-group">
                                        <label htmlFor={`candidateName${index}`}>Candidate Name</label>
                                        <input
                                            type="text"
                                            id={`candidateName${index}`}
                                            name={`candidateName${index}`}
                                            placeholder='Enter candidate name'
                                            value={candidate.name}
                                            onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                                        />
                                        {errors[`candidateName${index}`] && <span className="attestation-error">{errors[`candidateName${index}`]}</span>}
                                    </div>
                                    <div className="attestation-form-group">
                                        <label htmlFor={`candidateWallet${index}`}>Candidate Wallet Address</label>
                                        <input
                                            type="text"
                                            id={`candidateWallet${index}`}
                                            name={`candidateWallet${index}`}
                                            placeholder='Enter candidate wallet address'
                                            value={candidate.walletAddress}
                                            onChange={(e) => handleCandidateChange(index, 'walletAddress', e.target.value)}
                                        />
                                        {errors[`candidateWallet${index}`] && <span className="attestation-error">{errors[`candidateWallet${index}`]}</span>}
                                    </div>
                                </div>
                                <div className="attestation-form-row image-upload">
                                    <div className="attestation-form-group image-upload">
                                        <label htmlFor={`candidateImage${index}`}>Select Candidate Image</label>
                                        <input
                                            type="file"
                                            id={`candidateImage${index}`}
                                            name={`candidateImage${index}`}
                                            accept=".png, .jpg, .jpeg"
                                            onChange={(e) => handleImageChange(index, e.target.files)}
                                        />
                                        <label htmlFor={`candidateImage${index}`} className="custom-file-upload">
                                            {candidate.image ? candidate.image.name : 'Select Image'}
                                        </label>
                                        {errors[`candidateImage${index}`] && <span className="attestation-error">{errors[`candidateImage${index}`]}</span>}
                                    </div>
                                </div>
                                {index > 0 && (
                                    <button type="button" onClick={() => removeCandidate(index)} className="attestation-candidate-add attestation-candidate-remove">
                                        Remove Candidate
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={addCandidate} className="attestation-candidate-add">
                            Add Candidate
                        </button>

                        <button type="submit" className="attestation-confirm-btn">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Attestations;