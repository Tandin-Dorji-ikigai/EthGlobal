import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/votingpoll.css";

function Voting(props) {
  const navigate = useNavigate();
  const allPolls = props.elections;
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const filteredPolls =
    activeButton === "All"
      ? allPolls
      : allPolls.filter((poll) =>
          activeButton === "Open" ? poll.active : !poll.active
        );

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    const sameSite = "SameSite=Lax";
    document.cookie = `${name}=${value}; ${expires}; path=/; ${sameSite}`;
  };

  const handleViewMoreClick = (pollId) => {
    // Store the poll ID in a cookie
    setCookie("pollId", pollId, 1); // Store poll ID for 1 day
    navigate("/voting2");
  };
  return (
    <div className="voting-poll-content">
      <div className="voting-poll-container">
        <div className="voting-title">Polls</div>
        <div>
          Using the advanced Sign Protocol, VotexChain guarantees that only
          verified voters can participate. This eliminates the risk of
          fraudulent votes or impersonation.
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
          filteredPolls.map((poll, index) => (
            <div key={poll.name} className="poll-card-container">
              <div className="poll-card">
                <div className="poll-title">
                  {poll.active ? "Open" : "Closed"} Poll
                </div>
                <div className="poll-name">{poll.name}</div>
                <button
                  className="view-more-btn"
                  onClick={() => handleViewMoreClick(index + 1)}
                >
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
