import React from "react";
import logo from '../../assets/logo.svg'
import './Header.scss'

const Header=()=>{
    return(
        <div className="header-container">
            <div className="header-Wrap">
                <div className="header_wrap_logo">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <h3 className="logo_txt">Infinity</h3>
                </div>
                <div className="header__menu">
                    <button className="signup-btn">Sign Up</button>
                    <button className="login-btn">LogIn</button>
                </div>
            </div>
        </div>
    )
}

export default Header;