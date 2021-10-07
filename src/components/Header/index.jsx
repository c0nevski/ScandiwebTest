import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo-x512.png";
import "./index.scss";

class Header extends Component {
  state = {
    cart: {
      cartItems: 2,
      cartTotal: "$150.00",
      isOpen: false,
    },
  };

  toggleCartVisibility = (e) => {
    if( e.target.classList.value === 'cart-open-blur' || e.target.classList.value === 'material-font material-icons-outlined') {
      this.setState({
        cart: {
          ...this.state.cart,
          isOpen: !this.state.cart.isOpen,
        }
      });
    }
  }

  render() {
    return (
      <>
        <header className="main-header">
          {/* NAVIGATION MENU */}
          <nav className="main-header__navigation">
            <ul className="nav">
              <li className="nav__item">
                <NavLink
                  to="/"
                  exact
                  activeClassName="nav__link--active"
                  className="nav__link"
                >
                  WOMEN
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/men"
                  exact
                  activeClassName="nav__link--active"
                  className="nav__link"
                >
                  MEN
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/kids"
                  exact
                  activeClassName="nav__link--active"
                  className="nav__link"
                >
                  KIDS
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* CENTERED LOGO */}
          <div className="main-header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          {/* CURRENCY SWITCHER & CART */}
          <div className="main-header__actions">
            <ul className="actions">
              <li className="actions__item">
                $
                <span className="material-font material-icons-outlined">
                  expand_more
                </span>
              </li>
              <li className="actions__item" onClick={this.toggleCartVisibility}>
                <span className="material-font material-icons-outlined">
                  shopping_cart
                </span>
                <span className="item__badge">{this.state.cart.cartItems}</span>
                <div className={`actions__cart ${this.state.cart.isOpen ? 'actions__cart--open' : ''}`}>
                  <h2 className="cart__total-items">
                    <strong>My Bag</strong>, {this.state.cart.cartItems} items
                  </h2>
                  <div className="cart__product-tile">
                    <div className="col col--left">
                      <div className="col__top">
                        <h3>Apollo Running Short</h3>
                        <h4>$50.00</h4>
                      </div>
                      <div className="col__bottom">
                        <button className="btn btn--active">S</button>
                        <button className="btn">M</button>
                      </div>
                    </div>
                    <div className="col col--right">
                      <div className="buttons">
                        <button className="btn">+</button>
                        <span>1</span>
                        <button className="btn">-</button>
                      </div>
                      <img
                        src="https://collectionapi.metmuseum.org/api/collection/v1/iiif/107620/1358492/main-image"
                        alt="product"
                      />
                    </div>
                  </div>
                  <div className="cart__total">
                    <span>Total</span>
                    <span>{this.state.cart.cartTotal}</span>
                  </div>
                  <div className="cart__actions">
                    <button className="btn">
                      VIEW BAG
                    </button>
                    <button className="btn btn--primary">
                      CHECKOUT
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </header>
        { this.state.cart.isOpen && <div onClick={this.toggleCartVisibility} className="cart-open-blur"></div>}
      </>
    );
  }
}

export default Header;
