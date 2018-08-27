import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {

        // Need to do this in action creators using redux
        // axios.get('/orders.json')
        //     .then((response) => {
        //         const fetchedOrders = [];
        //         for(let key in response.data) {
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             });
        //         }
        //         console.log(fetchedOrders);
        //         this.setState({orders: fetchedOrders, loading: false});
        //     })
        //     .catch((error) => {
        //         this.setState({error:true, loading: false});
        //     })
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render () {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={+order.price}
                    loading={this.props.loading}/>
            ));
        }
        return orders;
    }
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        onFetchOrder: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(Orders, axios));