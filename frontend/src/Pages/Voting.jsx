import React, { useState } from "react";
import "./css/votingpoll.css";

const allPolls = [
  { id: 1, title: "Election 1", status: "Open" },
  { id: 2, title: "Election 2", status: "Closed" },
  { id: 3, title: "Election 3", status: "Open" },
  { id: 4, title: "Election 4", status: "Closed" },
  { id: 5, title: "Election 5", status: "Open" }
];

function Voting() {
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filteredPolls = allPolls.filter(poll => {
    if (activeButton === "All") return true;
    return poll.status === activeButton;
  });

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
        {filteredPolls.length > 0 ? (
          filteredPolls.map(poll => (
            <div key={poll.id} className="poll-card-container">
              <div className="poll-card">
                <div className="poll-title">{poll.status} Poll</div>
                <div className="poll-name">{poll.title}</div>
                <button className="view-more-btn">
                  View More
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No polls available</div>
        )}
      </div>
    </div>
  );
}

export default Voting;
