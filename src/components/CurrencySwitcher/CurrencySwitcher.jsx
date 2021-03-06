import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCurrency } from '../../redux/Shopping/shopping-actions';
import './CurrencySwitcher.scss';

export class CurrencySwitcher extends Component {

  displayCurrencyList = ({currency, selectCurrency}) => {
    return currency.list.map((c) => {
      return (
        <li
          key={c.name}
          onClick={() => selectCurrency(c.name)}
          className="currency-menu__item"
        >
          {`${c.symbol} ${c.name}`}
        </li>
      );
    });
  }

  render() {
    return (
      <ul
        ref={this.props.refs}
        className={`currency-dropdown__currency-menu ${
          this.props.currency.isOpen ? "currency-dropdown__currency-menu--open" : ""
        }`}
      >
        {this.displayCurrencyList(this.props)}
      </ul>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      selectCurrency: (currency) => dispatch(selectCurrency(currency)),
    };
  };

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
