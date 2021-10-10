import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import "./App.scss";
import { CategoryPage } from "./pages";
import { connect } from "react-redux";
import { toggleCart, toggleCurrency } from './redux/Shopping/shopping-actions';


class App extends Component {

  closeCartAndCurrencyIfOpen = (cartIsOpen, currencyIsOpen, toggleCart, toggleCurrency) => {
    if(cartIsOpen) {
      toggleCart();
    } else if(currencyIsOpen) {
      toggleCurrency();
    } else return;
  }

  render() {
    const { cart, currency, toggleCart, toggleCurrency } = this.props;
    return (
      <div className="app">
      <Header />
      <div onClick={() => this.closeCartAndCurrencyIfOpen(cart.isOpen, currency.isOpen, toggleCart, toggleCurrency)} className={`app__container ${cart.isOpen ? 'app__container--cart-open' : ''}`}>
        <Switch>
          <Route exact path="/">
            <CategoryPage categoryName="WOMEN" />
          </Route>
          <Route path="/men">
            <CategoryPage categoryName="MEN" />
          </Route>
          <Route exact path="/kids">
            <CategoryPage categoryName="KIDS" />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleCart: () => dispatch(toggleCart()),
    toggleCurrency: () => dispatch(toggleCurrency()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
