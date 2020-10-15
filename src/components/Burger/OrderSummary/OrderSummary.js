import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredoentSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key = {igKey}>
                    <span style = {{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A dilicious burger with the following ingredients:</p>
            <ul>
                {ingredoentSummary}
            </ul>
            <p>Continue to check out?</p>
        </Aux>
    );
};
export default orderSummary;