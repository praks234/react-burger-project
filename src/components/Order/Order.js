import React from 'react';

import classes from './Order.css';

const order = (props) => {

    const ingredients = [];
    for(let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient]
        });
    }

    let ingredientList = ingredients.map((ig) => {
        return <span 
            style={{
                textTransform: 'capitalize',
                padding: '5px',
                margin: '0 8px',
                border: '1px solid #ccc'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientList}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

    

export default order;