import React, { useState } from "react";
import "./css/votingpoll.css";

function Voting() {
  // State to manage which button is active
  const [activeButton, setActiveButton] = useState("All");

  // Function to handle button clicks and set active state
  const handleButtonClick = (buttonName) => {
    console.log(buttonName)
    setActiveButton(buttonName);
  };

  return (
    <div className="voting-poll-content">
      <div className="voting-poll-container">
        <div className="voting-title">Polls</div>
        <div>
          Using the advanced Sign Protocol, VotexChain guarantees that only verified voters can participate. This eliminates the risk of fraudulent votes or impersonation.
        </div>

        <div className="accord-btn-container">
          <button
            className={`arr-btn ${activeButton === "All" ? "active" : ""}`}
            onClick={() => handleButtonClick("All")}
          >
            All
          </button>
          <button
            className={`arr-btn ${activeButton === "Open" ? "active" : ""}`}
            onClick={() => handleButtonClick("Open")}
          >
            Open
          </button>
          <button
            className={`arr-btn ${activeButton === "Closed" ? "active" : ""}`}
            onClick={() => handleButtonClick("Closed")}
          >
            Closed
          </button>
        </div>

      </div>
      <div className="election-poll-container">
        <div className="poll-card-container">
          <div className="poll-card">
            <div className="poll-title">
              Open Poll
            </div>
            <div className="poll-name">
              Election 1
            </div>
            <button className="view-more-btn">
              View More
            </button>
          </div>
        </div>
        <div className="poll-card-container">
          <div className="poll-card">
            <div className="poll-title">
              Open Poll
            </div>
            <div className="poll-name">
              Election 1
            </div>
            <button className="view-more-btn">
              View More
            </button>
          </div>
        </div>
        <div className="poll-card-container">
          <div className="poll-card">
            <div className="poll-title">
              Open Poll
            </div>
            <div className="poll-name">
              Election 1
            </div>
            <button className="view-more-btn">
              View More
            </button>
          </div>
        </div>
        <div className="poll-card-container">
          <div className="poll-card">
            <div className="poll-title">
              Open Poll
            </div>
            <div className="poll-name">
              Election 1
            </div>
            <button className="view-more-btn">
              View More
            </button>
          </div>
        </div>
        <div className="poll-card-container">
          <div className="poll-card">
            <div className="poll-title">
              Open Poll
            </div>
            <div className="poll-name">
              Election 1
            </div>
            <button className="view-more-btn">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voting;
