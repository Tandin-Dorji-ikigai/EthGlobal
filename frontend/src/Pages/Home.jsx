import React, { useState } from 'react'
import Navbar from '../Component/Navbar';
import "./css/Home.css"

function Home() {
  return (
    <>
      <div className="features-wrapper">
        <div className="features">
          <p className='feature-topic'>KEY FEATURES</p>
          <div className="feature-box">
            <div className="feature-card">
              <p className='card-topic'>Transparent</p>
              <p className='card-des'>
                With VotexChain, every vote is permanently recorded on the blockchain, creating an open, verifiable trail for public auditing. No vote can be altered or deleted,
                ensuring that the entire voting process is fully transparent from start to finish. Voters and organizations alike can verify that each vote has been cast correctly
                and counted, reinforcing the legitimacy of any election
              </p>
            </div>
            <div className="feature-card">
              <p className='card-topic'>Secure</p>
              <p className='card-des'>
                Using the advanced Sign Protocol, VotexChain guarantees that only verified voters can participate. This eliminates the risk of fraudulent votes or impersonation. Each voter’s identity is cryptographically secured before casting a vote, ensuring that election integrity is upheld without compromising personal privacy.
              </p>
            </div>
            <div className="feature-card">
              <p className='card-topic'>Real-Time Tallying</p>
              <p className='card-des'>
                Say goodbye to delayed election results. VotexChain’s real-time tallying feature allows you to view the results as they unfold. Votes are counted automatically and tamper-proof through the blockchain, ensuring that no interference or manipulation can occur during the tallying process. Whether it's a small community vote or a large-scale election, you'll have instant access to accurate, up-to-date results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="process-wrapper">
        <div className="process-content-container">
          <p className='process-topic'>
            How It Works
          </p>

          <div className="steps-container">
            <div className="steps-content">
              <div className="steps-number">
                01
              </div>
              <div className="steps-des-cont">
                <div className="steps-des-subdes">
                  With VotexChain, every vote is permanently recorded on the blockchain, creating an open, verifiable trail for public auditing. No vote can be altered or deleted, ensuring that the entire voting process is fully transparent from start to finish. Voters and organizations alike can verify that each vote has been cast correctly and counted, reinforcing the legitimacy of any election
                </div>
              </div>
            </div>
            <div className="steps-content">
              <div className="steps-number">
                02
              </div>
              <div className="steps-des-cont">
                <div className="steps-des-subdes">
                  With VotexChain, every vote is permanently recorded on the blockchain, creating an open, verifiable trail for public auditing. No vote can be altered or deleted, ensuring that the entire voting process is fully transparent from start to finish. Voters and organizations alike can verify that each vote has been cast correctly and counted, reinforcing the legitimacy of any election
                </div>
              </div>
            </div>
            <div className="steps-content">
              <div className="steps-number">
                03
              </div>
              <div className="steps-des-cont">
                <div className="steps-des-subdes">
                  With VotexChain, every vote is permanently recorded on the blockchain, creating an open, verifiable trail for public auditing. No vote can be altered or deleted, ensuring that the entire voting process is fully transparent from start to finish. Voters and organizations alike can verify that each vote has been cast correctly and counted, reinforcing the legitimacy of any election
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="useCase-wrapper">
        <div className="useCase-content">

          <div className="useCaseMain-content">
            <p className="usecase-topic">
              USE CASES
            </p>
            <p className="usecase-subTopic">
              COOPERATE GOVERNANCE
            </p>

            <p className="usecase-content">
              In the corporate world, decision-making is often complex and requires the input of various stakeholders, including shareholders, board members, and executives. VotexChain can be utilized to streamline and secure the voting processes within corporations.
            </p>
          </div>
        </div>

        <div className="useCase-content usecase-content-even">
          <div className="useCaseMain-content">
            <p className="usecase-topic">
              USE CASES
            </p>
            <p className="usecase-subTopic">
              COOPERATE GOVERNANCE
            </p>

            <p className="usecase-content">
              In the corporate world, decision-making is often complex and requires the input of various stakeholders, including shareholders, board members, and executives. VotexChain can be utilized to streamline and secure the voting processes within corporations.
            </p>
          </div>
        </div>
        <div className="useCase-content">
          <div className="useCaseMain-content">
            <p className="usecase-topic">
              USE CASES
            </p>
            <p className="usecase-subTopic">
              COOPERATE GOVERNANCE
            </p>

            <p className="usecase-content">
              In the corporate world, decision-making is often complex and requires the input of various stakeholders, including shareholders, board members, and executives. VotexChain can be utilized to streamline and secure the voting processes within corporations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;