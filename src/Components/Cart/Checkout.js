import React,{useRef,useState} from 'react'
import classes from './Checkout.module.css';

const valueIsEmpty = (value) => value.trim() === "";
const valueIsNotFiveChars =  value => value.trim().length >= 5;

const Checkout = (props) => {
const nameRef = useRef();
const streetRef = useRef();
const postalRef = useRef();
const cityRef = useRef();

const [formValidity,setFormValidity] = useState({
    name:true,
    street:true,
    postalCode:true,
    city:true,
})

const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const street = streetRef.current.value;
    const postalCode = postalRef.current.value;
    const city = cityRef.current.value;

    const nameValid = !valueIsEmpty(name);
    const streetValid = !valueIsEmpty(street);
    const cityValid = !valueIsEmpty(city);
    const postalCodeValid = valueIsNotFiveChars(postalCode);
    console.log(postalCodeValid);

    setFormValidity({
        name:nameValid,
        street:streetValid,
        city:cityValid,
        postalCode:postalCodeValid
    })

    const formIsValid = nameValid && streetValid && cityValid && postalCodeValid;

    if(!formIsValid) {
        return ;
    }

    props.onConfirm({
       name,
       street,
       postalCode,
       city,
    });
}
const nameClasses = `${classes.control} ${formValidity.name ? "": classes.invalid}`; 
const streetClasses = `${classes.control} ${formValidity.street ? "": classes.invalid}`; 
const postalCodeClasses = `${classes.control} ${formValidity.postalCode ? "": classes.invalid}`; 
const cityClasses = `${classes.control} ${formValidity.city ? "": classes.invalid}`; 

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && <p>The field cannot be empty</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && <p>The field cannot be empty</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal-code">Postal Code</label>
        <input type="text" id="postal-code" ref={postalRef} />
        {!formValidity.postalCode && <p>The value must be at least 5 characters long</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && <p>The field cannot be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout