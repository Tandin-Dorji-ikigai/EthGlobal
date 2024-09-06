import React from 'react'
import Navbar from '../Component/Navbar';
import "./css/Home.css"

function Home() {
  return (
    <>
      <div className="features-wrapper">
        <div className="features">
          <p className='feature-topic'>KEY FEATURES</p>
          <div className="feature-box">
            <div className="feature-card"></div>
            <div className="feature-card"></div>
            <div className="feature-card"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;