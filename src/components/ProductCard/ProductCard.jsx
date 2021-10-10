import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ProductCard.scss";
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import { toast } from "react-toastify";

class ProductCard extends Component {
  notify = (productName) =>
    toast.success(
      `${productName} was added to your bag.`,
    {
      position: "top-right",
      autoClose: 2500,
      theme: 'colored',
      closeButton: false,
    });

  addItemToCard = (product) => {
    this.props.addToCart(product.id);
    this.notify(product.name);
  };

  render() {
    const { product } = this.props;
    return (
      <div className="product-card">
        <div className="product-card__image">
          <img src={product.image} alt="product" />
          {!product.inStock && (
            <div className="product-card__image--out-of-stock">
              <h3>OUT OF STOCK</h3>
            </div>
          )}
          {product.inStock && (
            <button
              onClick={() => this.addItemToCard(product)}
              className="product-card__btn"
            >
              <span className="material-font material-icons-outlined">
                shopping_cart
              </span>
            </button>
          )}
        </div>
        <h3 className="product-card__name">{product.name}</h3>
        <h3 className="product-card__price">{product.price}</h3>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (itemID) => dispatch(addToCart(itemID)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
