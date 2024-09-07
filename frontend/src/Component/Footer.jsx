import React from "react";

import "./Footer.css";
import Logo from "../Assets/footer.png";
import Facebook from "../Assets/facebook.png";
import LinkedIn from "../Assets/instagram.png";
import Instagram from "../Assets/linkedin.png";

const Footer = () => {
    return (
        <>
            <div className="footer-container">
                <img src={Logo} alt="Footer Logo" />
                <div className="footer-social-container">
                    <div> <img src={Facebook} alt="Footer facebook" /></div>
                    <div> <img src={LinkedIn} alt="Footer linkedin" /></div>
                    <div> <img src={Instagram} alt="Footer instagram" /></div>
                </div>

                <div className="hr-line">
                </div>
                <div className="copy-text">
                        © 2024 Archangel. All rights reserved.
                </div>
            </div>
        </>
    );
};

export default Footer;
