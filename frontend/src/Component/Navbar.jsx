import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import "./Navbar.css";
import Logo from "../Assets/logo.png"
import MetaImg from "../Assets/metamask.png"
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