import React, { Component } from "react";
import { connect } from "react-redux";
import { CartProductTile } from '../index'
import './MiniCart.scss';

class MiniCart extends Component {

  getCartTotal = () => {
    const currency = this.props.currency.selectedCurrency;
    const totalAmount = this.props.cart.products.reduce((total, product) => {
      const qty = product.qty;
      const productPrice = product.prices.find(price => price.currency === currency);
      return total + (productPrice.amount * qty);
    }, 0);

    return `${currency} ${totalAmount.toFixed(2)}`;
  }

  render() {
    return (
      <div
        className={`cart-dropdown__cart-menu ${
          this.props.cart.isOpen ? "cart-dropdown__cart-menu--open" : ""
        }`}
      >
        <h2>
          <strong>My Bag,</strong> {this.props.cart.products.length} items
        </h2>
        {this.props.cart.products.map((product, index) => {
          return <CartProductTile key={`${product.id}-${index}`} product={product} />;
        })}
        <div className="cart-menu__total">
          <span>Total</span>
          <span className="price-bold">{this.getCartTotal()}</span>
        </div>
        <div className="cart-menu__buttons">
          <button className="btn btn--view-bag">View bag</button>
          <button className="btn btn--checkout">Checkout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps)(MiniCart);
