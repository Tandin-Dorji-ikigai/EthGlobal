import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./css/votingpoll.css";

function Attestations() {
    const [formData, setFormData] = useState({
        fullName: '',
        cid: '',
        address: '',
        dob: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    // Check wallet connection when component mounts
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length === 0) {
                        // Redirect to homepage if no accounts are connected
                        navigate('/');
                    }
                } catch (error) {
                    console.error("Failed to check wallet connection:", error);
                    navigate('/');
                }
            } else {
                // Redirect if MetaMask is not installed
                navigate('/');
            }
        };

        checkWalletConnection();
    }, [navigate]); // Add navigate as a dependency

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.cid) newErrors.cid = 'CID is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            setFormData({
                fullName: '',
                cid: '',
                address: '',
                dob: ''
            });
            setErrors({});
        }
    };

    return (
        <div className="voting-poll-content">
            <div className="voting-poll-container">
                <div className="voting-title">Create Attestations</div>
                <div>
                    Creating attestation involves generating a secure, verifiable proof of identity or action on the blockchain, ensuring authenticity and trust.
                </div>

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
                                    placeholder='Enter your full name'
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                                {errors.fullName && <span className="attestation-error">{errors.fullName}</span>}
                            </div>
                            <div className="attestation-form-group">
                                <label htmlFor="cid">CID</label>
                                <input
                                    type="text"
                                    id="cid"
                                    name="cid"
                                    placeholder='Enter your cid'
                                    value={formData.cid}
                                    onChange={handleChange}
                                />
                                {errors.cid && <span className="attestation-error">{errors.cid}</span>}
                            </div>
                        </div>
                        <div className="attestation-form-row">
                            <div className="attestation-form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder='Enter your address'
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                {errors.address && <span className="attestation-error">{errors.address}</span>}
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
                                {errors.dob && <span className="attestation-error">{errors.dob}</span>}
                            </div>
                        </div>
                        <button type="submit" className="attestation-confirm-btn">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Attestations;
