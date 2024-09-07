import React, { useState } from 'react';
import { X } from 'lucide-react';
import "./css/votingpoll.css";

// Popup component
const AttestationPopup = ({ attestation, onClose }) => (
    <div className="attestation-popup-overlay">
        <div className="attestation-popup">
            <button className="close-button" onClick={onClose}>
                <X size={24} />
            </button>
            <h2>User Attestation</h2>
            <p className="attestation-id">{attestation.id}</p>

            <div className="attestation-row">
                <div className="attestation-column">
                    <p>Full Name</p>
                    <p>{attestation.fullName}</p>
                </div>
                <div className="attestation-column">
                    <p>Address</p>
                    <p>{attestation.address}</p>
                </div>
            </div>


            <div className="attestation-row">
                <div className="attestation-column">
                    <p>CID</p>
                    <p>{attestation.cid}</p>
                </div>
                <div className="attestation-column">
                    <p>DOB</p>
                    <p>{attestation.dob}</p>
                </div>
            </div>
        </div>
    </div>
);

function UserAttestations() {
    const [selectedAttestation, setSelectedAttestation] = useState(null);

    // Mock data for attestations
    const attestations = [
        { id: "12345643213", fullName: "Debray Penjor", address: "Thimphu,Bhutan", cid: "11308006095", dob: "11/04/1900" },
        { id: "23456743214", fullName: "DOrji Man", address: "Paro,Bhutan", cid: "11308006095", dob: "11/04/1900" },
        { id: "34567843215", fullName: "Agay God", address: "Pling,Bhutan", cid: "11308006095", dob: "11/04/2001" },
        { id: "45678943216", fullName: "Jigme Noob", address: "Thimphu,Bhutan", cid: "11308006095", dob: "11/04/1002" },
        { id: "56789043217", fullName: "Kishi Jump", address: "Thimphu,Bhutan", cid: "11308006095", dob: "11/04/1919" },
    ];

    const handleViewAttestation = (attestation) => {
        setSelectedAttestation(attestation);
    };

    const handleClosePopup = () => {
        setSelectedAttestation(null);
    };

    return (
        <div className="voting-poll-content">
            <div className="voting-poll-container">
                <div className="voting-title">User Attestations</div>
                <div>
                    Using the advanced Sign Protocol, VotexChain guarantees that only verified voters can participate. This eliminates the risk of fraudulent votes or impersonation.
                </div>
            </div>

            <div className="userAttestations-wrapper">
                {attestations.map((attestation) => (
                    <div key={attestation.id} className="userAttestations">
                        <p>{attestation.id}</p>
                        <div className="userAssBtns">
                            <button onClick={() => handleViewAttestation(attestation)}>View Attestation</button>
                            <button>Revoke Attestation</button>
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