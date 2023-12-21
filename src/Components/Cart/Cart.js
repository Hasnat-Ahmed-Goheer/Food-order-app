import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Containers/Context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// const DUMMY_CART = [{id:'c1', name:'Sushi',amount:2,price:32.42}];

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submit, setSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const total = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://food-order-database-fb5fc-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ order: cartCtx.items, data: userData }),
        headers: { "Content-Type": "application/json" },
      }
    );

    setIsSubmitting(false);
    setSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((itemT) => (
        <CartItem
          item={itemT}
          onAdd={cartItemAddHandler.bind(null, itemT)}
          onRemove={cartItemRemoveHandler.bind(null, itemT.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !submit && (
        <>
          {" "}
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{total}</span>
          </div>
          {checkout && (
            <Checkout onCancel={props.onHide} onConfirm={orderSubmitHandler} />
          )}
          {!checkout && (
            <div className={classes.actions}>
              <button onClick={props.onHide} className={classes["button--alt"]}>
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}
      {isSubmitting && <p>Submitting the order...</p>}
      {!isSubmitting && submit && (
        <>
          <p>Submitted the Cart!</p>
          <div className={classes.actions}>
            <button onClick={props.onHide} className={classes["button--alt"]}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;

// export default React.memo(Cart);
// useCallback is a react hook that ensures that a function is not created at each component render cycle and is also takes a dependency array like useEffect useCallback also takes a function and a dependency array
// useMemo is a react hook that that ensures that a data array or object is not created or reintialized at each component render cycle and is also takes a dependency array like useEffect
// however it is takes in a function and returns the value that we need it to not change
