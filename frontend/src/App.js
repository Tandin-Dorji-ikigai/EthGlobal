import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Home from "./Pages/Home";
import Voting from "./Pages/Voting";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Voting2 from "./Pages/Voting2";
import Attestations from "./Pages/Attestation";
import CreatePolls from "./Pages/CreatePolls";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attestations" element={<Attestations />} />
          <Route path="/createPolls" element={<CreatePolls />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/voting2" element={<Voting2 />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
