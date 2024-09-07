import React from 'react';
import "./css/Voting.css";
import CandidateImage from "../Assets/image.png"; 

function Voting2() {
  const candidateData = [
    {
      "id": 1,
      "number": "01",
      "image": CandidateImage,
      "role": "Agay god enn lab mey",
      "name": "Tandin Dorji",
      "motto": "With VotexChain, every vote is securely and permanently recorded on the blockchain, ensuring a transparent and immutable voting process. Each vote creates a verifiable, time-stamped trail that is open for public auditing, giving both voters and authorities complete confidence in the integrity of the system. Since the blockchain is tamper-resistant, no vote can ever be altered, deleted, or manipulated, safeguarding the democratic process and making every election more accountable, secure, and trustworthy. VotexChain redefines voting transparency by providing a decentralized, audit-friendly system that protects the voice of the people."
    },
    {
      "id": 2,
      "number": "02",
      "image": CandidateImage, 
      "role": "Agay god enn lab mey",
      "name": "Karma Tshering",
      "motto": "With VotexChain, every vote is securely and permanently recorded on the blockchain, ensuring a transparent and immutable voting process. Each vote creates a verifiable, time-stamped trail that is open for public auditing, giving both voters and authorities complete confidence in the integrity of the system. Since the blockchain is tamper-resistant, no vote can ever be altered, deleted, or manipulated, safeguarding the democratic process and making every election more accountable, secure, and trustworthy. VotexChain redefines voting transparency by providing a decentralized, audit-friendly system that protects the voice of the people."
    },
    {
      "id": 3,
      "number": "03",
      "image": CandidateImage,
      "role": "Agay god enn lab mey",
      "name": "Pema Choden",
      "motto": "With VotexChain, every vote is securely and permanently recorded on the blockchain, ensuring a transparent and immutable voting process. Each vote creates a verifiable, time-stamped trail that is open for public auditing, giving both voters and authorities complete confidence in the integrity of the system. Since the blockchain is tamper-resistant, no vote can ever be altered, deleted, or manipulated, safeguarding the democratic process and making every election more accountable, secure, and trustworthy. VotexChain redefines voting transparency by providing a decentralized, audit-friendly system that protects the voice of the people."
    }
  ];

  return (
    <>
      <div className="voting-banner">
        <div className="voting-banner-content">
          <p>Open Poll</p>
          <p>Election 1</p>
          <p>Say goodbye to delayed election results. VotexChain's real-time tallying feature allows you to view the results as they unfold. Votes are counted automatically and tamper-proof through the blockchain, ensuring that no interference or manipulation can occur during the tallying process. Whether it's a small community vote or a large-scale election, you'll have instant access to accurate, up-to-date results.</p>
        </div>
      </div>

      <div className="voting-candidates">
        <p className='candi-topic'>Candidates</p>
        <div className='candidate-wrapper'>
          {candidateData.map((candidate) => (
            <div className="candidate-container" key={candidate.id}>
              <div className="candidate-content1">
                <p className="cand-number">{candidate.number}</p>
                <div className="cand-img-container">
                  <img src={candidate.image} alt={candidate.name} /> 
                </div>
              </div>
              <div className="candidate-content2">
                <p className="cand-role">{candidate.role}</p>
                <p className="cand-name">{candidate.name}</p>
                <p className="cand-motto">{candidate.motto}</p>
              </div>
              <div className="candidate-content3">
                <button className='vote-btn'>Vote</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Voting2;