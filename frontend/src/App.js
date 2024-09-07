import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Voting from "./Pages/Voting";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Component/Navbar";
import Voting2 from "./Pages/Voting2";
import Voting3 from "./Pages/Voting2";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about " element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/voting2" element={<Voting2 />} />
          <Route path="/voting3" element={<Voting3 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
