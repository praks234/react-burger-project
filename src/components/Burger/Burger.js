import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
  //Object.keys will give an array of the properties of the Object
  //.map is run on the array passing a functio which runs on each element and retutns an array based on the value which that function returns
  //by using spread operator we are returnin an array of length based on the ingredient value
  //on that array again we are running map function to get array of BurgerIngredients of a perticular type.
  //so finally it gives an array of arrays based on the number of properties in props.ingredients.
  //console.log(props.ingredients);
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);
  console.log(transformedIngredients);
  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients.</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
