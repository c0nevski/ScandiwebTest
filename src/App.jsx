import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { GraphqlClientContext } from "./graphQL/graphql-context";
import { categoriesQuery, currenciesQuery } from "./graphQL/graphql-queries";
import { Footer, Header, Loader, NoProductsFound } from "./components";
import "./App.scss";
import { CartPage, CategoryPage, PageNotFound, ProductPage } from "./pages";
import {
  setCategories,
  setCurrencies,
  toggleCart,
  toggleCurrency,
} from "./redux/Shopping/shopping-actions";
import BannerNotification from "./components/BannerNotfication/BannerNotification";

class App extends Component {
  static contextType = GraphqlClientContext;

  state = {
    isLoading: false,
  };

  componentDidMount() {
    const opusClient = this.context;
    this.getCategories(opusClient);
  }

  getCategories = async (client) => {
    try {
      this.setState({
        isLoading: true,
      });
      const { categories } = await client.post(categoriesQuery);
      const { currencies } = await client.post(currenciesQuery);
      this.props.setCategories(categories);
      this.props.setCurrencies(currencies);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  renderCategoriesRoutes = (categories) => {
    return categories.map((cat) => {
      return (
        <Route key={`${cat.name}-route`} path={`/${cat.name}`}>
          <CategoryPage categoryName={cat.name} />
        </Route>
      );
    });
  };

  render() {
    const { categories, cart } = this.props;

    if (this.state.isLoading) return <Loader />;
    if (categories.length === 0) return <NoProductsFound />;

    return (
      <div className="app">
        <Header />
        <div className={`app__container ${cart.isOpen ? "app__container--cart-open" : ""}`}>
          <Switch>
            <Route exact path="/">
              <Redirect to={`/${categories[0].name}`} />
            </Route>
            {this.renderCategoriesRoutes(categories)}
            <Route path="/product/:id">
              <ProductPage />
            </Route>
            <Route path="/cart">
              <CartPage />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <BannerNotification />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.shop.categories,
    cart: state.shop.cart,
    currency: state.shop.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCart: () => dispatch(toggleCart()),
    toggleCurrency: () => dispatch(toggleCurrency()),
    setCategories: (categories) => dispatch(setCategories(categories)),
    setCurrencies: (currencies) => dispatch(setCurrencies(currencies)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
