import React from 'react';
import classes from './Model.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const model = (props) => (
    <Aux>
        <Backdrop show = {props.show} clicked = {props.modelClosed}/>
        <div 
            className = {classes.Modal}
            style = {{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}> 
            {props.children}
        </div>

    </Aux>
    
);

export default model;