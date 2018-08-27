import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    meat: 1,
    cheese: 0.7,
    bacon: 0.8
  }

const reducer = (state=initialState, action) => {
    switch ( action.type) {
        case actionTypes.ADD_INGREDIENT :
            console.log("Adding from Reducer");
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT : 
            console.log("Removing from Reducer");
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS :
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FAILED_SET_INGREDIENTS :
            return {
                ...state,
                error: true
            }
        default :
            return state;
    }

}

export default reducer;