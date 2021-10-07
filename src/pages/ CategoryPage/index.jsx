import React, { Component } from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../../components";
import './index.scss';

export class CategoryPage extends Component {
  render() {
    return (
      <section className="homepage-section category">
        <h2 className="category__name">{this.props.categoryName}</h2>
        <div className="homepage-section__products-list">
          {this.props.products.map((product) => {
            return <ProductCard key={product.id} name={product.name} price={product.price} inStock={product.inStock} imageUri={product.image}/>;
          })}
        </div>
      </section>
    );
  }
}

CategoryPage.propTypes = {
  categoryName: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default CategoryPage;
