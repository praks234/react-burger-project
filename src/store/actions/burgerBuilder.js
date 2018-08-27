import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
const failedSetIngredients = () => {
    return {
        type: actionTypes.FAILED_SET_INGREDIENTS
    }
}
export const initIngrdients = () => {
    return (dispatch) => {
        axios.get('https://react-burger-project-5d230.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(failedSetIngredients());
            });
    }
}