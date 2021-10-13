import React, { Component } from "react";
import { connect } from "react-redux";
import iconEmptyCart from "../../assets/icon-empty-cart.png";
import "./CartPage.scss";

class CartPage extends Component {
  getCartTotal = () => {
    const currency = this.props.currency.selectedCurrency;
    const totalAmount = this.props.cart.products.reduce((total, product) => {
      const qty = product.qty;
      const productPrice = product.prices.find(
        (price) => price.currency === currency
      );
      return total + productPrice.amount * qty;
    }, 0);

    return `${currency} ${totalAmount.toFixed(2)}`;
  };

  render() {
    return (
      <section className="cart-page">
        <h2>Cart</h2>

      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps)(CartPage);
