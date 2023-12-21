import { useState } from 'react';
import Header from './Components/Layout/Header/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from "./Containers/Context/CartProvider"


function App() {
  const [cartIsVisible,setCartIsVisible] = useState(false);

  const showCartHandler = () =>{
    setCartIsVisible(true);
  }
  const hideCartHandler = () =>{
    setCartIsVisible(false);
  };

  return (
    <CartProvider>
      {cartIsVisible && <Cart  onHide = {hideCartHandler}/>}
      <Header onShow = {showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
