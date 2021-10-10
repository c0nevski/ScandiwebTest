import React, { Component } from "react";
import './CartProductTile.scss';

class CartProductTile extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-tile cart-menu__tile">
        <div className="row">
          <div className="col col--left">
            <h4 className="product-tile__name">{product.name}</h4>
            <h5 className="product-tile__price">{product.price}</h5>
            <div className="product-tile__sizes">
              <div className="row">
                <button className="product-tile__btn product-tile__btn--selected">
                  S
                </button>
                <button className="product-tile__btn">M</button>
              </div>
            </div>
          </div>
          <div className="col col--right">
            <div className="row">
              <div className="col col--buttons">
                <button className="product-tile__btn product-tile__btn--selected">
                  +
                </button>
                <span className="product-tile__qty">{product.qty}</span>
                <button className="product-tile__btn product-tile__btn--selected">
                  -
                </button>
              </div>
              <div
                className="col col--image"
                style={{
                  backgroundImage: `url("${product.image}")`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductTile;
