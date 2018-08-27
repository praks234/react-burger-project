import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'}
]

const buildControls = (props) => (
  <div className = {classes.BuildControls}>
    <div>CurrentPrice: <strong>{props.price.toFixed(2)}</strong></div>
    {controls.map((ctrl) => (
      <BuildControl label={ctrl.label}
        key={ctrl.label}
        added = {() =>props.ingredientAdded(ctrl.type)}
        removed = {() => props.ingredientRemoved(ctrl.type)}
        disabled = {props.disabled[ctrl.type]} />
    ))}
    <button 
      onClick={props.ordered} 
      disabled={!props.purchasable} 
      className={classes.OrderButton}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
  </div>
);

export default buildControls;
