import { createContext, useContext, useState } from "react";

const storage = JSON.parse(localStorage.getItem("cart" || "[]"));

const CartContext = createContext();
const SetContext = createContext();
export function useCart() {
  return useContext(CartContext);
}
export function useSetCart() {
  return useContext(SetContext);
}
export function CartProvider({ children }) {
  const [cart, setCart] = useState(storage);

  return (
    <CartContext.Provider value={cart}>
      <SetContext.Provider value={setCart}>{children}</SetContext.Provider>
    </CartContext.Provider>
  );
}

export default CartContext;
