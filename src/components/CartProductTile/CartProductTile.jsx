import React, { Component } from "react";
import { connect } from "react-redux";
import './CartProductTile.scss';

class CartProductTile extends Component {
  render() {
    const { product, currency } = this.props;
    console.log(currency);
    return (
      <div className="product-tile cart-menu__tile">
        <div className="row">
          <div className="col col--left">
            <h4 className="product-tile__name">{product.name}</h4>
            <h5 className="product-tile__price">{`${product.prices[0].currency} ${product.prices[0].amount}`}</h5>
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
                  backgroundImage: `url("${product.gallery[0]}")`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency,
  };
};

export default connect(mapStateToProps)(CartProductTile);
