import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-x512.png";
import "./index.scss";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        {/* NAVIGATION MENU */}
        <nav className="main-header__navigation">
          <ul className="nav">
            <li className="nav__item nav__item--active">
              <Link to="/" className="nav__link">WOMEN</Link>
            </li>
            <li className="nav__item">
              <Link to="/men" className="nav__link">MEN</Link>
            </li>
            <li className="nav__item">
              <Link to="/kids" className="nav__link">KIDS</Link>
            </li>
          </ul>
        </nav>
        {/* CENTERED LOGO */}
        <div className="main-header__logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        {/* CURRENCY SWITCHER & CART */}
        <div className="main-header__actions">
          <ul className="actions">
            <li className="actions__item">
              ${" "}
              <span className="material-font material-icons-outlined">
                expand_more
              </span>
            </li>
            <li className="actions__item">
              <span className="material-font material-icons-outlined">shopping_cart</span>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
