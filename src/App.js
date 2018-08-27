import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
//import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncCheckout = asyncComponent(() => {
  return  import('./containers/Checkout/Checkout')
});
const AsyncOrders = asyncComponent(() => {
  return  import('./containers/Orders/Orders')
});
const AsyncAuth = asyncComponent(() => {
  return  import('./containers/Auth/Auth')
});
const AsyncLogout = asyncComponent(() => {
  return  import('./containers/Auth/Logout/Logout')
});


class App extends Component {

  // constructor(props) {
  //   super(props);
  //   console.log("[App.js] - Inside constructor function");
  // }

  state= {
    show: true
  }

  

  // componentWillMount() {
  //   console.log("[App.js] - Inside componentWillMount function");
  // }
  //
    componentDidMount() {
      // console.log("[App.js] - Inside componentDidMount function");
      // setTimeout(() => {
      //   this.setState({show: false});
      // },4000);
      this.props.onAutoSignUp();
    }
  //
  // componentWillReceiveProps (nextProps) {
  //   console.log("[UPDATE App.js] - Inside componentWillReceiveProps function", nextProps);
  // }
  // // shouldComponentUpdate (nextProps, nextState) {
  // //   console.log("[UPDATE App.js] - Inside shouldComponentUpdate function", nextProps, nextState);
  // //   return nextState.persons !== this.state.persons ||
  // //     nextState.showPersons !== this.state.showPersons;
  // // }
  // componentWillUpdate (nextProps, nextState) {
  //   console.log("[UPDATE App.js] - Inside componentWillUpdate function", nextProps, nextState);
  // }
  // componentDidUpdate () {
  //   console.log("[UPDATE App.js] - Inside componentDidUpdate function");
  // }

  //Using exact

  // render() {
  //   return (
  //     <div>
  //         <Layout>
  //           <Route path = "/" exact component={BurgerBuilder} />
  //           <Route path = "/checkout" component={Checkout} />
  //         </Layout>
  //     </div>
  //   );
  // }

  //Other way to return above code using Swicth

  render() {
    let routes = (
      <Switch>
        <Route path = "/" exact component={BurgerBuilder} />
        <Route path = "/auth" component={AsyncAuth} />
        <Redirect to = "/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
              <Route path = "/checkout" component={AsyncCheckout} />
              <Route path = "/logout" component={AsyncLogout} />
              <Route path = "/orders" component={AsyncOrders} />
              <Route path = "/auth" component={AsyncAuth} />
              <Route path = "/" component={BurgerBuilder} />
              <Redirect to = "/" />
        </Switch>
      )
    }

    return (
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDisptachToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheck())
  }
}

export default withRouter(connect(mapStateToProps, mapDisptachToProps)(App));
