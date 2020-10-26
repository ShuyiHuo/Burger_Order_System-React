import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Salad from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BurgerControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-oders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../components/Error/errorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
}

class SaladBuilder extends Component {
    

    state = {
        ingredients: null,

        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        axios.get('https://my-app-d91a6.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState( { ingredients: response.data } );
            })
            .catch(error => {
                this.setState({error: true})
            });
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
        //add url here
        //alert("you countinue!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Zoe',
        //         address:{
        //             street: '111',
        //             zipcode: '02215',
        //             country: 'USA'
        //         },
        //         email: 'xxx@gmail.com'

        //     },
        //     deliverMethod: 'to go'
        // }
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false,purchasing: false});
        //     });

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let oderSummary = null;

   
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
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
                oderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    price = {this.state.totalPrice}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinued= {this.purchaseContinueHandler}/>;

    
        }

        if(this.state.loading){
            oderSummary = <Spinner/>
        }


        

        return (
            <Aux>
                <Model show ={this.state.purchasing} modelClosed = {this.purchaseCancelHandler}>
                    {oderSummary}

                </Model>
                {burger}
            </Aux>
            
        );
    }

}
export default errorHandler(SaladBuilder, axios);