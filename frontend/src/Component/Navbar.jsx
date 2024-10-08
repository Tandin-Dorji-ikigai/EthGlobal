import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Assets/logo.png";
import MetaImg from "../Assets/metamask.png";
import { IoClose, IoMenu } from "react-icons/io5";
import Loader from "./Loader";
import Swal from "sweetalert2";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cookieAddr, setCookieAddr] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  // Function to get cookie data
  const GetCookieData = () => {
    const address = getCookie("walletAddress");
    if (address) {
      setCookieAddr(address);
    }
  };

  useEffect(() => {
    GetCookieData(); // Initialize state with cookie data

    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        try {
          if (cookieAddr) {
            setWalletAddress(cookieAddr);
          } else {
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
            if (accounts.length > 0) {
              setWalletAddress(accounts[0]);
            }
          }
        } catch (error) {
          console.error("Failed to check connected wallet:", error);
        }
      }
    };
    checkConnectedWallet();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        document.cookie = `walletAddress=${accounts[0]}; path=/; max-age=${60 * 60 * 24 * 30
          }`; // Set cookie
      } else {
        setWalletAddress(null);
        document.cookie = "walletAddress=; path=/; max-age=0"; // Clear cookie
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [cookieAddr]);

  const connectWallet = async () => {
    setLoading(true);
    if (window.ethereum) {
      try {
        const permissions = await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });

        if (permissions) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const address = accounts[0];
          setWalletAddress(address);
          document.cookie = `walletAddress=${address}; path=/; max-age=${60 * 60 * 24 * 30
            }`;
          window.location.reload();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "MetaMask Error",
          text: "MetaMask connection failed. Please check your MetaMask extension.",
        });
        console.error("MetaMask connection failed:", error);
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "MetaMask Not Found",
        text: "MetaMask not detected. Please install MetaMask!",
      });
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    setLoading(true);
    setWalletAddress(null);

    Swal.fire({
      icon: "info",
      title: "Wallet Disconnected",
      text: "You can switch your wallet by selecting a different account in MetaMask.",
    });

    document.cookie = "walletAddress=; path=/; max-age=0"; // Clear the cookie
    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      {loading && <Loader />}
      <header className="header">
        <nav className="nav container">
          <NavLink to="/" className="nav__logo">
            <img src={Logo} alt="Logo" />
          </NavLink>

          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Home
                </NavLink>
              </li>
              {cookieAddr &&
                walletAddress &&
                walletAddress.toLowerCase() ===
                "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase() && (
                  <>
                    <li className="nav__item">
                      <NavLink
                        to="/userAttestations"
                        className="nav__link"
                        onClick={closeMenuOnMobile}
                      >
                        User Attestations
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink
                        to="/createPolls"
                        className="nav__link"
                        onClick={closeMenuOnMobile}
                      >
                        Create Polls
                      </NavLink>
                    </li>
                  </>
                )}
              <li className="nav__item">
                <NavLink
                  to="/voting"
                  className="nav__link"
                  onClick={closeMenuOnMobile}
                >
                  Voting Polls
                </NavLink>
              </li>

              <li className="nav__item nav-btn-container">
                {cookieAddr ? (
                  <>
                    {/* <button
                      className="nav__link nav__cta"
                      onClick={Attestation}
                    >
                      Attestation
                    </button> */}
                    {walletAddress &&
                      walletAddress.toLowerCase() !==
                      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" && (
                        <NavLink
                          to="/attestations"
                          className="nav__link nav__cta"
                          onClick={closeMenuOnMobile}
                        >
                          Attestation
                        </NavLink>
                      )}
                    <button
                      className="nav__link nav__cta"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button className="nav__ctaa" onClick={connectWallet}>
                    <img
                      src={MetaImg}
                      alt="MetaMask Logo"
                      className="meta-img"
                    />
                    Connect MetaMask
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
