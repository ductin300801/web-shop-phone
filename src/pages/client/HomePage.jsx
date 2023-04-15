import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosCient from "../../utils/axiosCLient";
import ProductCard from "../../components/client/ProductCard";
import { Box, Grid } from "@chakra-ui/react";

function HomePage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = () => {
    axiosCient
      .get("/product")
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="productsPageContainer">
      <Box padding="3rem calc(3rem + 10vw)">
        <Grid
          p="1rem"
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={8}
        >
          {products.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default HomePage;
