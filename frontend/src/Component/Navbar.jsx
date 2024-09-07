import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Assets/logo.png";
import MetaImg from "../Assets/metamask.png";
import { IoClose, IoMenu } from "react-icons/io5";
import Loader from "./Loader"; // Import the Loader component

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    const [loading, setLoading] = useState(false); // State for loader visibility

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
        setLoading(true); // Show loader
        if (window.ethereum) {
            try {
                const permissions = await window.ethereum.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }],
                });

                if (permissions) {
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const address = accounts[0];
                    setWalletAddress(address);
                    console.log("Connected Wallet Address:", address);
                }
            } catch (error) {
                console.error("MetaMask connection failed:", error);
            } finally {
                setLoading(false); // Hide loader
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask!");
            setLoading(false); // Hide loader
        }
    };

    const disconnectWallet = async () => {
        setLoading(true); // Show loader
        setWalletAddress(null);
        console.log("Wallet disconnected.");
        alert("You can switch your wallet by selecting a different account in MetaMask.");
        setLoading(false); // Hide loader
    };

    return (
        <>
            {loading && <Loader />} {/* Show loader if loading is true */}
            <header className="header">
                <nav className="nav container">
                    <NavLink to="/" className="nav__logo">
                        <img src={Logo} alt="Logo" />
                    </NavLink>

                    <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                        <ul className="nav__list">
                            {walletAddress && walletAddress.toLowerCase() === "0xaa4cd3b7706b1be52e44d115d4683b49542abf69" && (
                                <>
                                    <li className="nav__item">
                                        <NavLink to="/attestations" className="nav__link" onClick={closeMenuOnMobile}>
                                            User Attestations
                                        </NavLink>
                                    </li>
                                    <li className="nav__item">
                                        <NavLink to="/create-poll" className="nav__link" onClick={closeMenuOnMobile}>
                                            Create Polls
                                        </NavLink>
                                    </li>
                                </>
                            )}
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
                            <li className="nav__item nav-btn-container">
                                {walletAddress ? (
                                    <>
                                        <button className="nav__link nav__cta" onClick={Attestation}>
                                            Attestation
                                        </button>
                                        <button className="nav__link nav__cta" onClick={disconnectWallet}>
                                            Disconnect
                                        </button>
                                    </>
                                ) : (
                                    <button className="nav__link nav__cta" onClick={connectWallet}>
                                        Connect Wallet
                                    </button>
                                )}
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
