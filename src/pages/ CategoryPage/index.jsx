import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class CategoryPage extends Component {
    
    render() {
        return (
            <section className="homepage-section category">
                <h2 className="category__name">{this.props.categoryName}</h2>
            </section>
        )
    }
}

CategoryPage.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default CategoryPage
