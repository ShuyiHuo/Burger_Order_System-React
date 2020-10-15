import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Salad from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}

class SaladBuilder extends Component {
    

    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat: 0
        },

        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }

    addIngreedientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    removeIngreedientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("you countinue!");
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Model show ={this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients = {this.state.ingredients}
                        price = {this.state.totalPrice}
                        purchaseCanceled = {this.purchaseCancelHandler}
                        purchaseContinued= {this.purchaseContinueHandler}/>

                </Model>
                <Salad ingredients = {this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngreedientHandler}
                    ingredientRemoved = {this.removeIngreedientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.totalPrice}/>

            </Aux>
            
        );
    }

}
export default SaladBuilder;