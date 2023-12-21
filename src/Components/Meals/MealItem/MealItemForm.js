import React, { useRef ,useState} from "react";
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

const MealItemForm  = props =>{

    const [amountIsValid,setAmountIsValid] = useState(true);
    const submitHandler = event =>{
        event.preventDefault();

        const enteredAmount = Number(amountInputRef.current.value);
        

        if(enteredAmount < 1 || enteredAmount > 5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmount);
        setAmountIsValid(true); 
    }

const amountInputRef = useRef();

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
            ref = {amountInputRef}
            input = {{
                id : 'amount' + props.id,
                label : 'Amount',
                type : 'number',
                min : 1,
                max : 5,
                steps : 1,
                defaultValue : 1,

            }}/>
            <button>+ ADD</button>
            {!amountIsValid && <p>Please enter a correct amount (1-5).</p>}
        </form>
    )

};

export default MealItemForm;