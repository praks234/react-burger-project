import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Input from '../../../components/UI/Input/Input';
import *as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    
    initializeStructure = (...params) => {
        var tmp = {
            elementType: params[0],
            elementConfig: {},
            value: '',
            validation: {
                required: true
            },
            valid: false
        };
        if(params[0] === 'select') {
            tmp.elementConfig['options'] = [
                {value: 'fastest', displayName: 'Fastest'},
                {value: 'cheapest', displayName: 'Cheapest'}
            ];
        }else {
            tmp.elementConfig['type'] = params[1];
            tmp.elementConfig['placeholder'] = params[2];
        }
        return tmp;
    }
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Zip Code"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your Email"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayName: 'Fastest'},
                        {value: 'cheapest', displayName: 'Cheapest'}
                    ]
                },
                validation: {
                    required: false
                },
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        if(this.state.formIsValid) {
            this.setState({loading: true});
            const formData = {};
            for (let key in this.state.orderForm) {
                formData[key] = this.state.orderForm[key].value;
            }
            const order = {
                ingredients: this.props.ings,
                price: this.props.totalPrice,
                orderData: formData,
                userId: this.props.userId
            }

            this.props.onOrderBurger(order, this.props.token);

            //below call is handled through redux middleware

            // axios.post('/orders.json', order)
            // .then(response => {
            //     console.log(response);
                
            //     this.props.history.push("/");
            // })
            // .catch(error => {
            //     console.log(error);
            //     this.setState({loading: false});
            // });
        }
        
    }

    inputChangedHandler = (event, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[key]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = checkValidity(updateFormElement.value,updateFormElement.validation);
        
        updateFormElement.touched = true;
        updatedOrderForm[key] = updateFormElement;
        let formIsValid = true;
        for (let key in updatedOrderForm) { 
            formIsValid = formIsValid && updatedOrderForm[key].valid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched} />
                ))}
                <Button btnType="Success" disabled ={!this.state.formIsValid} >Order</Button>

            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details.</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }    
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));