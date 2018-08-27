import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
  
  componentWillMount () {
    // We dont need to fetch state from query params as we redux now.
    // const query  = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //   if(param[0] === 'price') {
    //     price = +param[1];
    //   } else {
    //     ingredients[param[0]] = +param[1];
    //   }
    // }
    // console.log(ingredients);
    // this.setState({ingredients: ingredients,totalPrice: price});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  }

  render () {
    console.log(this.props);
    let summary = <Redirect to="/"/>
    if(this.props.ings) {
      const purchasedOrder = this.props.purchased ? <Redirect to ="/" /> : '';
      summary = (
        <div>
            {purchasedOrder}
            <CheckoutSummary 
              ingredients = {this.props.ings}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinuedHandler} />
            <Route path={this.props.match.path + '/contact-data'} 
              component ={ContactData} />
        </div>
      )
    }
    return summary;
    // return (
    //   <div>
    //     <CheckoutSummary 
    //       ingredients = {this.props.ings}
    //       checkoutCancelled={this.checkoutCancelledHandler}
    //       checkoutContinued={this.checkoutContinuedHandler} />
    //     {/* Get rid of the props being passed as we are using redux now. */}
    //     {/* <Route path={this.props.match.path + '/contact-data'} 
    //       render ={(props) => (<ContactData 
    //         ingredients={this.props.ings}
    //         price={this.props.totalPrice} {...props}/>)} /> */}

    //     <Route path={this.props.match.path + '/contact-data'} 
    //       component ={ContactData} />
    //   </div>
    // );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps, null)(Checkout);
