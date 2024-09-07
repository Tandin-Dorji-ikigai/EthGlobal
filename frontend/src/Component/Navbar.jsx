import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BrowserProvider } from "ethers";
import "./Navbar.css";
import Logo from "../Assets/logo.png";
import MetaImg from "../Assets/metamask.png";
import { IoClose, IoMenu } from "react-icons/io5";
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const address = accounts[0]; 
                setWalletAddress(address);
                console.log("Connected Wallet Address:", address);
            } catch (error) {
                console.error("MetaMask connection failed:", error);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask!");
        }
    };

    return (
        <>
            <header className="header">
                <nav className="nav container">
                    <NavLink to="/" className="nav__logo">
                        <img src={Logo} alt="Logo" />
                    </NavLink>

                    <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <NavLink to="/voting" className="nav__link" onClick={closeMenuOnMobile}>
                                    User Attestations
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/voting" className="nav__link" onClick={closeMenuOnMobile}>
                                    Create Polls
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/voting" className="nav__link" onClick={closeMenuOnMobile}>
                                    Voting Polls
                                </NavLink>
                            </li>

                            <li className="nav__item">
                                <NavLink to="/login" className="nav__link" onClick={closeMenuOnMobile}>
                                    <img src={MetaImg} alt="MetaMask" />
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <button className="nav__link nav__cta" onClick={connectWallet}>
                                    {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
                                </button>
                            </li>
                        </ul>
                        <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                            <IoClose />
                        </div>
                    </div>

                    <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                        <IoMenu />
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Navbar;
