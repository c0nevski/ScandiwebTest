import React, { Component } from "react";
import { Loader, ProductCard } from "../../components";
import "./CategoryPage.scss";
import { GraphqlClientContext } from "../../graphQL/graphql-context";
import { getCategoryByNameQuery } from "../../graphQL/graphql-queries";
import { withRouter } from "react-router";

class CategoryPage extends Component {
  static contextType = GraphqlClientContext;

  state = {
      category: null,
      isLoading: false,
  }

  componentDidMount() {
    this.fetchCategoryWithProducts(this.props.categoryName);
  }

  fetchCategoryWithProducts = async (categoryName) => {
    const opusClient = this.context;
    try {
      this.setState({
        isLoading: true,
      });
      const { category } = await opusClient.post(getCategoryByNameQuery(categoryName));
      this.setState({
        category: category,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
    console.log(this.state);
  };

  render() {
    const { categoryName } = this.props;
    if(this.state.category === null) return <Loader />;
    return (
      <section className="category-page">
        <h2 className="category-page__title">{categoryName}</h2>
        <div className="category-page__products">
          {this.state.category.products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    );
  }
}

export default withRouter(CategoryPage);
