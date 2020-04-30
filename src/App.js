import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products] = useState(data);

  let localCart = localStorage.getItem("cart");
  localCart = localCart ? JSON.parse(localCart) : null;

  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    let newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const deleteItem = (id) => {
    const keepItem = cart.filter((item) => item.id !== id);
    setCart(keepItem);
    localStorage.setItem("cart", JSON.stringify(keepItem));
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem, deleteItem }}>
        <CartContext.Provider value={{ cart }}>
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart cart={cart} />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
