import React, { Component } from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import './CategoryPage.scss';

class CategoryPage extends Component {
    render() {
        const { products, categoryName, allproducts } = this.props;
        // IF allproducts is not defined -> display products by category, else display all products.
        const productsByCategory = allproducts ? products : products.filter(prod => prod.category === categoryName);
        return (
            <section className="category-page">
                <h2 className="category-page__title">
                    {categoryName}
                </h2>
                <div className="category-page__products">
                    { productsByCategory.map(product => {
                        return (<ProductCard key={product.id} product={product}/>);
                    }) }
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shop.products,
    }
}

export default connect(mapStateToProps)(CategoryPage);
