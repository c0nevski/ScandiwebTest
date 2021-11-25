import React, { Component } from "react";
import { connect } from "react-redux";
import { adjustQty, removeFromCart } from "../../redux/Shopping/shopping-actions";
import "./CartProductTile.scss";

class CartProductTile extends Component {
  productPrice = () => {
    const productPrice = this.props.product.prices.find(
      (price) => price.currency === this.props.currency.selectedCurrency
    );
    const currency = this.props.currency.list.find(c => c.name === this.props.currency.selectedCurrency);
    return `${currency.symbol} ${productPrice.amount}`;
  };

  adjustQuantity = (value) => {
    if(value <= 0) {
      this.removeFromCart(this.props.product);
    } else {
      this.props.adjustQty(this.props.product, value);
      this.setState({
        product: {...this.props.product, qty: value}
      });
    }
  }

  checkAttributes = () => {
    return this.state.attributes.every(
      (att) => att.selectedVal != null
    );
  }

  removeFromCart = (productID) => {
    this.props.removeFromCart(productID);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product-tile cart-menu__tile">
        <div className="row">
          <div className="col col--left">
            <h4 className="product-tile__name">
              {product.brand}
              <br /> {product.name}
            </h4>
            <h5 className="product-tile__price">{this.productPrice()}</h5>
            {product.attributes.map((att) => {
              return (
                <div key={att.id} className="product-tile__options">
                  <div className="row">
                    <div className="product-tile__option">
                      <ul>
                        <li>
                          <span>{att.name}</span>
                          <br />
                          {
                          att.selectedVal !== null &&
                              (att.type === 'swatch' ? <div style={{ backgroundColor: `${ att.items.find(i => i.displayValue === att.selectedVal).value }` }} className="option--swatch"></div> : <strong>{att.selectedVal}</strong>)
                            
                          }

                          { att.selectedVal == null && (<small>Not selected.</small>) }
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col col--right">
            <div className="row">
              <div className="col col--buttons">
                <button onClick={() => this.adjustQuantity(product.qty + 1)} className="product-tile__btn product-tile__btn--selected">
                  +
                </button>
                <span className="product-tile__qty">{product.qty}</span>
                <button onClick={() => this.adjustQuantity(product.qty - 1)} className="product-tile__btn product-tile__btn--selected">
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

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (product, value) => dispatch(adjustQty(product, value)),
    removeFromCart: (product) => dispatch(removeFromCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProductTile);
