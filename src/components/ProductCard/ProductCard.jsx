import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ProductCard.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/Shopping/shopping-actions";

class ProductCard extends Component {

  state = {
    attributesShown: false,
    attributes: this.props.product.attributes,
  }

  productPrice = () => {
    const productPrice = this.props.product.prices.find(price => price.currency === this.props.currency.selectedCurrency);
    const currentCurrency = this.props.currency.list.find(c => c.name === this.props.currency.selectedCurrency);
    return `${currentCurrency.symbol} ${productPrice.amount}`;
  }

  toggleAttributesCard = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(this.props.product.attributes.length === 0) {
      this.props.addToCart(this.props.product);
      this.showBannerNotification(
        `You have added ${this.props.product.name} to your bag`,
        "success"
      );
    } else {
      this.setState({
        attributesShown: !this.state.attributesShown,
      });
    }
    
  }

  displayProductCartImage = (product) => {
    if(product.inStock) {
      return (<div
        className="product-card__btn" onClick={this.toggleAttributesCard}
      >
        <span className="material-font material-icons-outlined">
          shopping_cart
        </span>
      </div>);
    } else {
      return  (<div className="product-card__image--out-of-stock">
      <h3>OUT OF STOCK</h3>
    </div>);
    }
  }

  selectProductAttribute = (attributeId, selectedValue) => {
    const updatedAttributes = this.state.attributes.map((att) => {
      if (att.id === attributeId) {
        return {
          ...att,
          selectedVal: selectedValue,
        };
      } else {
        return att;
      }
    });

    this.setState({
      attributes: updatedAttributes,
    });
  };

  displayProductAttributes = ( attributes ) => {
    return this.state.attributes.map((attrib) => {
      return (
        <div key={attrib.id} className="product-info__attributes">
          <div className="attributes__title">{attrib.name}:</div>
          <div className="attributes__options">
            {attrib.items.map((item) => {
              if (attrib.type === "swatch") {
                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      this.selectProductAttribute(attrib.id, item.displayValue)
                    }
                    className={`option option--swatch ${
                      attrib.selectedVal === item.displayValue
                        ? "option--selected"
                        : ""
                    }`}
                    style={{
                      backgroundColor: `${item.value}`,
                      opacity: `${
                        attrib.selectedVal === item.displayValue ? "1" : "0.3"
                      }`,
                    }}
                  ></button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    this.selectProductAttribute(attrib.id, item.displayValue)
                  }
                  className={`option ${
                    attrib.selectedVal === item.displayValue
                      ? "option--selected"
                      : ""
                  }`}
                >
                  {item.displayValue}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  showBannerNotification = (text, type) => {
    const notificationWrapper = document.querySelector(".custom-notification");

    switch (type) {
      case "warning":
        notificationWrapper.querySelector(
          ".custom-notification__text"
        ).innerHTML = text;
        notificationWrapper.classList.add(
          "custom-notification--open",
          "custom-notification--error"
        );
        setTimeout(function () {
          notificationWrapper.classList.remove("custom-notification--open");
          notificationWrapper.classList.remove("custom-notification--error");
        }, 2500);
        break;
      case "success":
        notificationWrapper.querySelector(
          ".custom-notification__text"
        ).innerHTML = text;
        notificationWrapper.classList.add("custom-notification--open");
        setTimeout(function () {
          notificationWrapper.classList.remove("custom-notification--open");
        }, 2500);
        break;
      default:
        break;
    }
  };

  beforeAddToCart = (e) => {
    const allSelected = this.state.attributes.every(
      (att) => att.selectedVal != null
    );
    if (allSelected) {
      const productToCart = {
        ...this.props.product,
        attributes: this.state.attributes,
      };
      this.props.addToCart(productToCart);
      this.setState({
        attributesShown: false,
      });
      this.showBannerNotification(
        `You have added ${productToCart.name} to your bag`,
        "success"
      );
    } else {
      const notSelected = this.state.attributes.find(
        (att) => att.selectedVal == null
      );
      this.showBannerNotification(
        `Please select ${notSelected.name} option`,
        "warning"
      );
    }
  };

  render() {
    const { product } = this.props;
    return (
      <Link to={this.state.attributesShown ? '#' : `/product/${product.id}`} className="product-card">
        { !this.state.attributesShown && <div className="product-card__image">
          <img src={product.gallery[0]} alt="product" />
          {this.displayProductCartImage(product)}
        </div>}
        { this.state.attributesShown && <div className="product-card__attributes">
          <button onClick={this.toggleAttributesCard} className="back-btn"><span className="material-icons-outlined arrow-left">chevron_left</span>BACK</button>
          {this.displayProductAttributes(this.state.attributes)}
          <button onClick={this.beforeAddToCart} className="add-btn">ADD TO CART</button>
        </div> }
        <h3 className="product-card__name">{product.name}</h3>
        <h3 className="product-card__price">{this.productPrice()}</h3>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currency: state.shop.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
