import "./Header.scss";
import logo from "../../assets/logo-x512.png";

import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <ul className="header__categories">
          <NavLink
            to="/"
            exact
            className="header__item"
            activeClassName="header__item--active"
          >
           WOMEN
          </NavLink>
          <NavLink
            to="/men"
            exact
            className="header__item"
            activeClassName="header__item--active"
          >
            MEN
          </NavLink>
          <NavLink
            to="/kids"
            exact
            className="header__item"
            activeClassName="header__item--active"
          >
            KIDS
          </NavLink>
        </ul>
        <div className="header__logo">
          <Link to="/"><img src={logo} alt="storefront logo" /></Link>
        </div>
        <ul className="header__actions">
          <li className="header__action-item">
            $<span className="material-icons-outlined">expand_more</span>
          </li>
          <li className="header__action-item">
            <span className="material-icons-outlined">shopping_cart</span>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
