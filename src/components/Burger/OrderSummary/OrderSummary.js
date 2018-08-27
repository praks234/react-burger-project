import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  //This could be a functional component and does not need to be a Class

  componentWillUpdate () {
    console.log("[OrderSummary.js]-- will update");
  }
  componentDidUpdate () {
    console.log("[UPDATE OrderSummary.js] - Inside componentDidUpdate function");
  }

  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p> Delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p> Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>CONTINUE</Button>
      </Aux>
    );
  }

};

export default OrderSummary;
