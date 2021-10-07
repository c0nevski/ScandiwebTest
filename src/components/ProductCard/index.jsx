import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

export class ProductCard extends Component {
  render() {
    return (
      <div className="product-card">
        <div className="product-card__image">
          <img src={this.props.imageUri} alt="product" />
          {!this.props.inStock && (
            <div className="product-card__image--out-of-stock">
              <h3>OUT OF STOCK</h3>
            </div>
          )}
          {this.props.inStock && (
            <button className="product-card__btn">
              <span className="material-font material-icons-outlined">
                shopping_cart
              </span>
            </button>
          )}
        </div>
        <h3 className="product-card__name">{this.props.name}</h3>
        <h3 className="product-card__price">{this.props.price}</h3>
      </div>
    );
  }
}

ProductCard.propTypes = {
  imageUri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
};

export default ProductCard;
