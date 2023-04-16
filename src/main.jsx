import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "./context/AppProvider";
import { FavorProvider } from "./context/FavorProvider";
import { CartProvider } from "./context/CartProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AppProvider>
          <FavorProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FavorProvider>
        </AppProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
