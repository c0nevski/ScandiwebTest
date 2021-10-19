import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { CurrencySwitcher, MiniCart } from "../index";
import logo from "../../assets/logo-x512.png";
import { connect } from "react-redux";
import {
  toggleCart,
  toggleCurrency,
} from "../../redux/Shopping/shopping-actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./Header.scss";

class Header extends Component {

  constructor(props) {
    super(props)
    this.cartRef = React.createRef();
    this.currencyRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.checkIfClickedOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside);
  }
  
  

  checkIfClickedOutside = e => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu
    if (this.props.cart.isOpen && this.cartRef.current && !this.cartRef.current.contains(e.target)) {
      this.closeCartAndCurrencyIfOpen();
    }

    if (this.props.currency.isOpen && this.currencyRef.current && !this.currencyRef.current.contains(e.target)) {
      this.closeCartAndCurrencyIfOpen();
    }
  }
  

  openCart = () => {
    if (this.props.currency.isOpen) {
      this.props.toggleCurrency();
    }
    this.props.toggleCart();
  };

  openCurrency = () => {
    if (this.props.cart.isOpen) {
      this.props.toggleCart();
    }
    this.props.toggleCurrency();
  };

  closeCartAndCurrencyIfOpen = () => {
    if (this.props.cart.isOpen) {
      this.props.toggleCart();
    } else if (this.props.currency.isOpen) {
      this.props.toggleCurrency();
    } else return;
  };

  render() {
    const { cart, currency, categories } = this.props;
    return (
      <>
        <ToastContainer />
        <header className="header">
          <div className="header__container">
            <div className="header__categories">
              <NavLink
                to="/"
                exact
                className="header__item"
                activeClassName="header__item--active"
              >
                HOME
              </NavLink>
              {categories.map((cat) => {
                return (
                  <NavLink
                    key={`header-link-${cat.name}`}
                    to={`/${cat.name}`}
                    exact
                    className="header__item"
                    activeClassName="header__item--active"
                  >
                    {cat.name}
                  </NavLink>
                );
              })}
              {/* <Link to="/404" className="header__item">404</Link> */}
            </div>
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="storefront logo" />
              </Link>
            </div>
            <ul className="header__actions">
              <li
                onClick={() => this.openCurrency()}
                className="header__action-item currency-dropdown"
              >
                {currency.selectedCurrency}
                <span className="material-icons-outlined">
                  {currency.isOpen ? "expand_less" : "expand_more"}
                </span>
                <CurrencySwitcher refs={this.currencyRef} currency={currency} />
              </li>
              <li className="header__action-item cart-dropdown">
                <span
                  onClick={() => this.openCart()}
                  className="material-icons-outlined"
                >
                  shopping_cart
                  <span className="badge">{cart.products.length}</span>
                </span>
                <MiniCart refs={this.cartRef}/>
              </li>
            </ul>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.shop.categories,
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: () => dispatch(toggleCart()),
    toggleCurrency: () => dispatch(toggleCurrency()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
