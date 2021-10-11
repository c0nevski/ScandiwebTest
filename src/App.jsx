import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { GraphqlClientContext } from "./graphQL/graphql-context";
import { categoriesWithProductsQuery, currenciesQuery } from "./graphQL/graphql-queries";
import { Footer, Header, Loader, NoProductsFound } from "./components";
import "./App.scss";
import { CategoryPage, PageNotFound } from "./pages";
import {
  setCategories,
  setCurrencies,
  toggleCart,
  toggleCurrency,
} from "./redux/Shopping/shopping-actions";

class App extends Component {
  static contextType = GraphqlClientContext;

  state = {
    isLoading: false,
  };

  componentDidMount() {
    const opusClient = this.context;
    this.getDataFromServer(opusClient);
  }

  getDataFromServer = async (client) => {
    try {
      this.setState({
        isLoading: true,
      });
      const { categories } = await client.post(categoriesWithProductsQuery);
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

  closeCartAndCurrencyIfOpen = (
    cartIsOpen,
    currencyIsOpen,
    toggleCart,
    toggleCurrency
  ) => {
    if (cartIsOpen) {
      toggleCart();
    } else if (currencyIsOpen) {
      toggleCurrency();
    } else return;
  };

  render() {
    const { products, categories, cart, currency, toggleCart, toggleCurrency } =
      this.props;

    if (this.state.isLoading) return <Loader />;
    return (
      <div className="app">
        <Header />
        <div
          onClick={() =>
            this.closeCartAndCurrencyIfOpen(
              cart.isOpen,
              currency.isOpen,
              toggleCart,
              toggleCurrency
            )
          }
          className={`app__container ${
            cart.isOpen ? "app__container--cart-open" : ""
          }`}
        >
          {products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <Switch>
              <Route exact path="/">
                <CategoryPage categoryName="ALL PRODUCTS" allproducts />
              </Route>
              {categories.map((cat) => {
                return (
                  <Route key={`${cat.name}-route`} path={`/${cat.name}`}>
                    <CategoryPage categoryName={cat.name} />
                  </Route>
                );
              })}
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          )}
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.shop.categories,
    products: state.shop.products,
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
