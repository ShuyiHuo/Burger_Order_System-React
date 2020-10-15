import React from 'react';
import classes from './Burger.module.css';
import SaladIngredient from './BurgerIngredient/BurgerIngredient';
const salad = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return[...Array(props.ingredients[igKey])].map((_,i)=>{
                return <SaladIngredient key = {igKey + i} type = {igKey}/>;
            });
        })
        .reduce((arr,el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return(
        <div className = {classes.Salad}>
            <SaladIngredient type = "bread-top"/>
            {transformedIngredients}
            <SaladIngredient type = "bread-bottom"/>
        </div>
        
    );

};

export default salad;