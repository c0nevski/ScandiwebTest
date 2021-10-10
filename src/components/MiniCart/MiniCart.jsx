import React, { Component } from "react";
import { CartProductTile } from '../index'
import './MiniCart.scss';

class MiniCart extends Component {
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
        {this.props.cart.products.map((product) => {
          return <CartProductTile key={product.id} product={product} />;
        })}
      </div>
    );
  }
}

export default MiniCart;
