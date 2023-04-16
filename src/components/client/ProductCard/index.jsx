import React, { Fragment } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import styled from "styled-components";
import { useFavor } from "../../../context/FavorProvider";
import { useAuth } from "../../../context/AppProvider";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useCart } from "../../../context/CartProvider";
import { toast } from "react-toastify";

function ProductCard({ item }) {
  const { onAdd } = useCart();
  const handleAddCart = (product) => {
    try {
      onAdd(product);
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };
  return (
    <Box
      className={styles.box}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
    >
      <Link className={styles.link} to={`/product/${item.id}`}>
        <Image
          className={styles.cardImage}
          src={"http://localhost:8081/image/" + item.image}
          alt="product"
          loading="lazy"
        />
        <Box p="6">
          <Text
            fontSize="15px"
            fontWeight="bold"
            color="#bbb"
            textAlign="right"
          >
            {item.category.name}
          </Text>
          <Box
            fontSize="medium"
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
          >
            {item.name}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
          >
            {item.priceSale ? (
              <Fragment>
                <Box fontSize="20px">{item.priceSale}vnd</Box>
                <Box textDecoration="line-through">{item.price}vnd</Box>
              </Fragment>
            ) : (
              <Box>{item.price}vnd</Box>
            )}
          </Box>
        </Box>
      </Link>
      <Box className={styles.buttonContainer}>
        <Button
          colorScheme="purple"
          isFullWidth
          onClick={() => handleAddCart(item)}
        >
          <BsFillCartPlusFill fontSize="24px" />
        </Button>
      </Box>
    </Box>
  );
}

export default ProductCard;
