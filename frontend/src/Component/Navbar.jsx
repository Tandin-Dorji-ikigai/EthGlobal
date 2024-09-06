import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../Assets/logo.png"
import Banner from "../Assets/banner.png"

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
            setShowMenu(false);
        }
    };

    return (
        <>
            <header className="header">
                <nav className="nav container">
                    <NavLink to="/" className="nav__logo">
                        <img src={Logo} alt="" srcset="" />
                    </NavLink>

                    <div className={`nav__menu ${showMenu ? "show-menu" : ""}`} id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <NavLink to="/news" className="nav__link" onClick={closeMenuOnMobile}>
                                    About Us
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/about-us" className="nav__link" onClick={closeMenuOnMobile}>
                                    Voting Polls
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/favorite" className="nav__link" onClick={closeMenuOnMobile}>
                                    Contact Us
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/location" className="nav__link" onClick={closeMenuOnMobile}>
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav__item">
                                <NavLink to="/get-started" className="nav__link nav__cta">
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

            <div className="banner-wrapper">
                <div className="overlay-banner"></div>
                <img src={Banner} alt="" srcset="" />
                <div className="banner-content">
                    <p className="sup-text">Introducing Votexchain</p>
                    <p className="main-text">Redefining Voting with blockhain security</p>
                    <p className="sub-text">From identity verification to final tallying, experience transparent elections powered by the latest in decentralized technology.</p>

                    <Link to="/register" className="nav__link nav__cta cta-banner">
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;