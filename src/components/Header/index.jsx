import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo-x512.png";
import "./index.scss";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        {/* NAVIGATION MENU */}
        <nav className="main-header__navigation">
          <ul className="nav">
            <li className="nav__item">
              <NavLink to="/" exact activeClassName="nav__link--active" className="nav__link">WOMEN</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/men" exact activeClassName="nav__link--active" className="nav__link">MEN</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/kids" exact activeClassName="nav__link--active" className="nav__link">KIDS</NavLink>
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
