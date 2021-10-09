import React, { Component } from 'react';
import { ProductCard } from '../../components';
import { connect } from 'react-redux';
import './CategoryPage.scss';

class CategoryPage extends Component {
    render() {
        const { products, categoryName } = this.props;
        return (
            <section className="category-page">
                <h2 className="category-page__title">
                    {categoryName}
                </h2>
                <div className="category-page__products">
                    { products.map(product => {
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
