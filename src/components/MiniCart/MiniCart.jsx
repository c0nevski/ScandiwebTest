import React, { Component } from "react";
import { connect } from "react-redux";
import { CartProductTile } from '../index'
import iconEmptyCart from "../../assets/icon-empty-cart.png";
import './MiniCart.scss';
import { Link } from "react-router-dom";
import { toggleCart } from "../../redux/Shopping/shopping-actions";

class MiniCart extends Component {

  getCartTotal = () => {
    const currency = this.props.currency.list.find(c => c.name === this.props.currency.selectedCurrency);
    const totalAmount = this.props.cart.products.reduce((total, product) => {
      const qty = product.qty;
      const productPrice = product.prices.find(price => price.currency === this.props.currency.selectedCurrency);
      return total + (productPrice.amount * qty);
    }, 0);

    return `${currency?.symbol} ${totalAmount.toFixed(2)}`;
  }

  displayMinicartProductTiles = (cart) => {
    return cart.products.map((product, index) => {
      return <CartProductTile key={`${product.id}-${index}`} product={product} />;
    });
  }

  render() {
    const {cart, refs, toggleCart} = this.props;
    return (
      <div ref={refs} className={`cart-dropdown__cart-menu ${cart.isOpen ? "cart-dropdown__cart-menu--open" : ""}`}>
        <h2><strong>My Bag,</strong> {cart.products.length} items</h2>
        { cart.products.length === 0 && <img src={iconEmptyCart} className="empty-cart-icon" alt="Your cart is empty." /> }
        {this.displayMinicartProductTiles(cart)}
        <div className="cart-menu__total">
          <span>Total</span>
          <span className="price-bold">{this.getCartTotal()}</span>
        </div>
        <div className="cart-menu__buttons">
          <Link to="/cart" onClick={() => toggleCart()} className="btn btn--view-bag">View bag</Link>
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: () => dispatch(toggleCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
