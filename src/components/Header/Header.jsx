import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { CartProductTile } from '../index'
import "./Header.scss";
import logo from "../../assets/logo-x512.png";
import { connect } from "react-redux";
import { toggleCart, toggleCurrency } from '../../redux/Shopping/shopping-actions';


class Header extends Component {
  openCart = () => {
    if(this.props.currency.isOpen) {
      this.props.toggleCurrency();
    }
    this.props.toggleCart();
  }

  openCurrency = () => {
    if(this.props.cart.isOpen) {
      this.props.toggleCart();
    }
    this.props.toggleCurrency();
  }
  render() {
    const { cart, currency } = this.props;
    return (
      <header className="header">
        <div className="header__container">
        <div className="header__categories">
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
        </div>
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="storefront logo" />
          </Link>
        </div>
        <ul className="header__actions">
          <li onClick={() => this.openCurrency()} className="header__action-item currency-dropdown">
            { currency.selectedCurrency.symbol }<span className="material-icons-outlined">{ currency.isOpen ? 'expand_less' : 'expand_more' }</span>
            <ul className={`currency-dropdown__currency-menu ${currency.isOpen ? 'currency-dropdown__currency-menu--open' : ''}`}>
              <li className="currency-menu__item">$ USD</li>
              <li className="currency-menu__item">€ EUR</li>
              <li className="currency-menu__item">¥ JPY</li>
            </ul>
          </li>
          <li className="header__action-item cart-dropdown">
            <span onClick={() => this.openCart()} className="material-icons-outlined">shopping_cart<span className="badge">{cart.products.length}</span></span>
            <div className={`cart-dropdown__cart-menu ${cart.isOpen ? 'cart-dropdown__cart-menu--open' : ''}`}>
              <h2>
                <strong>My Bag,</strong> {cart.products.length} items
              </h2>
              { cart.products.map(product => {
                return (<CartProductTile key={product.id} product={product} />);
              }) }
              
            </div>
          </li>
        </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCart: () => dispatch(toggleCart()),
    toggleCurrency: () => dispatch(toggleCurrency()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
