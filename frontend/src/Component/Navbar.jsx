import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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

    // Check if wallet is already connected when component mounts
    useEffect(() => {
        const checkConnectedWallet = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setWalletAddress(accounts[0]);
                    }
                } catch (error) {
                    console.error("Failed to check connected wallet:", error);
                }
            }
        };
        checkConnectedWallet();

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                } else {
                    setWalletAddress(null);
                }
            });
        }
    }, []);

    const Attestation = () => {
        window.location.href = "/attestations";
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Request account permissions and trigger MetaMask prompt
                const permissions = await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });

                if (permissions) {
                    // After requesting permissions, get the accounts
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const address = accounts[0];
                    setWalletAddress(address); // Set new wallet address
                    console.log("Connected Wallet Address:", address);
                }
            } catch (error) {
                console.error("MetaMask connection failed:", error);
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask!");
        }
    };

    // Function to disconnect the current wallet
    const disconnectWallet = () => {
        setWalletAddress(null); // Clear the wallet address
        console.log("Wallet disconnected.");
        alert("You can switch your wallet by selecting a different account in MetaMask.");
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
                                    <img src={MetaImg} alt="" />
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/register" className="nav__link nav__cta">
                                    Register
                                </NavLink>
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
