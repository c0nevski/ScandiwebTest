import React, { Component } from "react";
import { connect } from "react-redux";
import { adjustQty, removeFromCart, updateAttributesInCart } from "../../redux/Shopping/shopping-actions";
import "./FullCartProductTile.scss";

class FullCartProductTile extends Component {

  state = {
    product: this.props.product,
  };

  productPrice = () => {
    const productPrice = this.props.product.prices.find(
      (price) => price.currency === this.props.currency.selectedCurrency
    );
    const currency = this.props.currency.list.find(c => c.name === this.props.currency.selectedCurrency);
    return `${currency.symbol} ${productPrice.amount}`;
  };

  selectProductAttribute = (attributeId, selectedValue) => {
    const updatedAttributes = this.state.product.attributes.map((att) => {
      if (att.id === attributeId) {
        return {
          ...att,
          selectedVal: selectedValue,
        };
      } else {
        return att;
      }
    });

    const updatedProduct = {...this.state.product, attributes: updatedAttributes};

    this.updateAttributesInCart(updatedProduct, this.state.product);
    this.setState({ product: updatedProduct });
  };

  updateAttributesInCart = (product, oldProduct) => {
    this.props.updateProductAttributesInCart(product, oldProduct);
  }

  adjustQuantity = (value) => {
    if(value <= 0) {
      this.removeFromCart(this.state.product);
    } else {
      this.props.adjustQty(this.state.product, value);
      this.setState({
        product: {...this.state.product, qty: value}
      });
    }
  }



  removeFromCart = (product) => {
    this.props.removeFromCart(product);
  }
  

  render() {
    const { product } = this.props;
    return (
      <div className="full-cart-tile">
        <div className="row">
          <div className="col col--left">
            <h4 className="full-cart-tile__name">
              <strong>{product.brand}</strong>
              <br /> {product.name}
            </h4>
            <h5 className="full-cart-tile__price">{this.productPrice()}</h5>
            {product.attributes.map((attr) => {
              return (
                <div key={attr.name} className="full-cart-tile__options">
                  <span className="option__label">{attr.name}</span>
                  <div className="row">
                    {attr.items.map((option) => {
                      if (attr.type === "swatch") {
                        return (
                          <button
                            key={option.id}
                            onClick={() => this.selectProductAttribute(attr.id, option.displayValue)}
                            style={{ backgroundColor: `${option.value}`,borderWidth: `${ attr.selectedVal === option.displayValue ? '3px' : '1px' }` , opacity: `${ attr.selectedVal === option.displayValue ? '1' : '.3' }`}}
                            className={`full-cart-tile__option full-cart-tile__option--swatch ${
                              attr.selectedVal === option.id
                                ? "full-cart-tile__option--selected"
                                : ""
                            }`}
                          ></button>
                        );
                      } else {
                        return (
                          <button
                            key={option.id}
                            onClick={() => this.selectProductAttribute(attr.id, option.displayValue)}
                            className={`full-cart-tile__option ${
                              attr.selectedVal === option.displayValue
                                ? "full-cart-tile__option--selected"
                                : ""
                            }`}
                          >
                            {option.displayValue}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col col--right">
            <div className="row">
              <div className="col col--buttons">
                <button onClick={() => this.adjustQuantity(this.state.product.qty + 1)} className="full-cart-tile__btn full-cart-tile__btn--selected">
                  +
                </button>
                <span className="full-cart-tile__qty">{product.qty}</span>
                <button onClick={() => this.adjustQuantity(this.state.product.qty - 1)} className="full-cart-tile__btn full-cart-tile__btn--selected">
                  -
                </button>
              </div>
              <div className="col col--image full-cart-tile__image">
                <img src={product.gallery[0]} alt={product.name} />
              </div>
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


const mapDispatchToProps = (dispatch) => {
  return {
    updateProductAttributesInCart: (product, oldProduct) => dispatch(updateAttributesInCart(product, oldProduct)),
    adjustQty: (product, value) => dispatch(adjustQty(product, value)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullCartProductTile);
