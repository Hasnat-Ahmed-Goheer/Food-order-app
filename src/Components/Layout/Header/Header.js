import React, { Fragment } from "react";
import mealsImage from "../../../Assets/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css"

const Header = (props) => {
    return (
      <Fragment>
        <header className={classes.header}>
          <h1>Meals</h1>
         <HeaderCartButton onShow = {props.onShow}/>
        </header>
        <div className={classes["main-image"]}>
          <img
            src={mealsImage}
            alt="A table full of delicious Food"
            
          />
        </div>
      </Fragment>
    );
   

}


export default Header;