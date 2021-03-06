import React, { Component } from "react";
import { connect } from "react-redux";
import { EmptyCart, FullCartProductTile } from "../../components";
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

  displayProductTiles = (products) => {
    return products.map((product, index) => {
      return <FullCartProductTile key={`${product.id}-${index}`} product={product} />;
    });
  }

  render() {
    const { products } = this.props.cart;

    if (products.length === 0) return <EmptyCart />;

    return (
      <section className="cart-page">
        <h2 className="cart-page__title">Cart</h2>
        {this.displayProductTiles(products)}
        <div className="cart-page__total">
          <button className="cart-page__checkout cart-page__checkout--btn">
            CHECKOUT
          </button>
        </div>
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
