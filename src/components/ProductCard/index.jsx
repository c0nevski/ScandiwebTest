import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export class ProductCard extends Component {
    render() {
        return (
            <div className="product-card">
                <div className="product_card__image">
                    <img src={this.props.imageUri} alt="product" />
                </div>
                <h3 className="product-card__name">
                    {this.props.name}
                </h3>
                <h3 className="product-card__price">
                    {this.props.price}
                </h3>
            </div>
        )
    }
}

ProductCard.propTypes = {
    imageUri: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

export default ProductCard;
