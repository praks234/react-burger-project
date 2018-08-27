import React, {Component} from 'react';
import {connect} from 'react-redux'

import Aux from '../../hoc/Aux/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

//Moving prices constants to reducer as it will get calculated from there after adding redux.
// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   meat: 1,
//   cheese: 0.7,
//   bacon: 0.8
// }
class BurgerBuilder extends Component {

  state = {
    //handled using redux
    //ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false
    // loading: false,
    // error: false
  }

  componentDidMount () {
    // Handled using redux.
    // axios.get('https://react-burger-project-5d230.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch(error => {
    //     this.setState({error:true});
    //   });
    this.props.onInitIngrdients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('/auth');
    }
    
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler =() => {
    //alert("CONTINUE");
    // this.setState({loading: true})
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Prakhar Shukla',
    //     addres: {
    //       street: 'ITPL Main Road',
    //       zipCode: '560037',
    //       country: 'India'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }

    // axios.post('/orders.json', order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({loading: false, purchasing: false});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({loading: false, purchasing: false});
    //   });
    //We dont need these query params anymore since we are using redux now.
    // const queryParams = [];
    // for(let i in this.props.ings) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    // };
    // queryParams.push("price="+this.props.totalPrice);
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  }

  updatePurchaseState () {
    const sum = Object.keys(this.props.ings).map((igKey) => {
      return this.props.ings[igKey];
    }).reduce((sum, el) => {
      return sum+el;
    },0);
    return sum>0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = newCount;
  //   const priceAdded = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const priceUpdated = oldPrice + priceAdded;
  //   this.setState((prevState, props) => {
  //     return {
  //       totalPrice: priceUpdated,
  //       ingredients: updatedIngredients
  //     };
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount === 0) {
  //       return 0;
  //   }
  //   const newCount = oldCount - 1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = newCount;
  //   const priceAdded = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const priceUpdated = oldPrice - priceAdded;
  //   this.setState((prevState, props) => {
  //     return {
  //       totalPrice: priceUpdated,
  //       ingredients: updatedIngredients
  //     };
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }


  render () {
    const disabledInfo = {...this.props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;


    let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p> : <Spinner />
    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients = {this.props.ings}/>
          <BuildControls
            ingredientAdded = {this.props.onIngredientAdded}
            ingredientRemoved = {this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            price={this.props.totalPrice}
            ordered = {this.purchaseHandler}
            isAuth={this.props.isAuthenticated}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        totalPrice={this.props.totalPrice}
        continueOrder={this.purchaseContinueHandler}
        cancelOrder={this.purchaseCancelHandler}
        ingredients={this.props.ings} />;
    }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) =>  dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngrdients: () => dispatch(actions.initIngrdients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit())
  };                                    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
