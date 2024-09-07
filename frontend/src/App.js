import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Voting from "./Pages/Voting";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
