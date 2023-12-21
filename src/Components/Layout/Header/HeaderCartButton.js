import React, { useContext,useEffect,useState} from "react";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../../Containers/Context/cart-context";

const HeaderCartButton = (props) => {
const cartCtx= useContext(CartContext);
const [btnHighlight,setBtnHighlight] = useState(false);

const noOfCartItems = cartCtx.items.reduce((curr,item) => curr + item.amount, 0);

useEffect(() =>{
if(cartCtx.items.length === 0){
  return;
}
setBtnHighlight(true);
const timer = setTimeout(() =>{
  setBtnHighlight(false)
}, 300)
return () =>{
  clearTimeout(timer);
}

},[cartCtx.items]);

const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : "" }`;

return (
  <button className={btnClasses} onClick={props.onShow}>
    <span className={classes.icon}>
     <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{noOfCartItems}</span>
  </button>
);
}
;export default HeaderCartButton;