import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  });

  const handleAddToCart = (item) => {
    console.log(item);
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index >= 0) {
      setCart((prevCart) => {
        const newCart = [...prevCart];
        newCart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    } else {
      setCart((prevCart) => {
        item.quantity = 1;
        const newCart = [...prevCart, item];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const handleRemoveCartItem = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((cartItem) => cartItem.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleIncreaseQuantity = (id) => {
    const index = cart.findIndex((cartItem) => cartItem.id === id);
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleDescreaseQuantity = (id) => {
    const index = cart.findIndex((cartItem) => cartItem.id === id);
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        onAdd: handleAddToCart,
        onRemove: handleRemoveCartItem,
        onIncrease: handleIncreaseQuantity,
        onDescrease: handleDescreaseQuantity,
        onClear: handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
