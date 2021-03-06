import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import { withRouter } from "react-router";
import parse from "html-react-parser";
import { Loader } from "../../components";
import "./ProductPage.scss";
import { getProductByIdQuery } from "../../graphQL/graphql-queries";
import { GraphqlClientContext } from "../../graphQL/graphql-context";

class ProductPage extends Component {
  static contextType = GraphqlClientContext;

  state = {
    product: null,
    selectedImage: null,
    attributes: null,
  };

  componentDidMount() {
    this.fetchProduct(this.props.match.params.id);
  }

  fetchProduct = async (productId) => {
    const opusClient = this.context;
    try {
      this.setState({
        isLoading: true,
      });
      const { product } = await opusClient.post(getProductByIdQuery(productId));
      this.setState({
        product: product,
        selectedImage: product.gallery[0],
        attributes: product.attributes,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  selectProductImage = (image) => {
    this.setState({
      selectedImage: image,
    });
  };

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

  beforeAddToCart = () => {
    const allSelected = this.state.attributes.every(
      (att) => att.selectedVal != null
    );
    if (allSelected) {
      const productToCart = {
        ...this.state.product,
        attributes: this.state.attributes,
      };
      this.props.addToCart(productToCart);
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

  displayProductPrice = () => {
    const currency = this.props.currency.list.find(
      (c) => c.name === this.props.currency.selectedCurrency
    );
    const price = this.state.product.prices.find(
      (price) => price.currency === this.props.currency.selectedCurrency
    );
    return `${currency.symbol} ${price.amount}`;
  };

  displayProductGalleryThumbnails = (product) => {
    return product.gallery.map((image, index) => {
      return (
        <img
          key={`${product.id}-image-${index}`}
          onClick={() => this.selectProductImage(image)}
          src={image}
          alt={product.name}
        />
      );
    });
  };

  displayProductAttributes = ( attributes ) => {
    return attributes.map((attrib) => {
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

  displayAddToCartBtn = (product) => {
    if (product.inStock) {
      return (
        <button
          onClick={() => this.beforeAddToCart()}
          className="btn-add-to-cart"
        >
          ADD TO CART
        </button>
      );
    } else {
      return (
        <>
          <button className="btn-add-to-cart btn-add-to-cart--out-of-stock">
            OUT OF STOCK
          </button>
        </>
      );
    }
  };

  render() {
    if (this.state.product === null) return <Loader />;

    return (
      <section className="product-page">
        <div className="product-page__gallery">
          <div className="gallery__thumbnails">
            {this.displayProductGalleryThumbnails(this.state.product)}
          </div>
          <div className="gallery__full-image">
            <img src={this.state.selectedImage} alt="" />
          </div>
        </div>
        <div className="product-page__product-info">
          <div className="product-info__name">{this.state.product.name}</div>
          {this.displayProductAttributes(this.state.attributes)}
          <div className="product-info__price">
            <h3 className="price__label">Price:</h3>
            <h3 className="price__amount">{this.displayProductPrice()}</h3>
          </div>
          <div className="product-info__add-to-cart">
            {this.displayAddToCartBtn(this.state.product)}
          </div>
          <div className="product-info__description">
            {parse(this.state.product.description)}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    currency: state.shop.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductPage)
);
