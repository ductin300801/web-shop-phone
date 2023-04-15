import React from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Text, Button, Image } from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useFavor } from "../../../context/FavorProvider";
import { useAuth } from "../../../context/AppProvider";
import { useEffect } from "react";
import axiosCient from "../../../utils/axiosCLient";
import { useState } from "react";

function ProductDetailPage() {
  const { productId } = useParams();
  const { addToFavor, favors } = useFavor();
  const { isLogin } = useAuth();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosCient
      .get("/product/" + productId)
      .then((response) => {
        setProduct(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const myHearthSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="white"
      viewBox="0 0 24 24"
    >
      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
    </svg>
  );
  const myCartSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />
    </svg>
  );

  const myHomeSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z" />
    </svg>
  );

  return (
    <div className={styles.productDetailContainerDiv}>
      <Link to="/">
        <Button colorScheme="green" ml="6">
          {myHomeSvg}
        </Button>
      </Link>
      <Button
        colorScheme={"purple"}
        ml="6"
      >
        Thanh toán
      </Button>

      <Button
        colorScheme={"orange"}
        ml="6"
      >
       Thêm vào giỏ hàng
      </Button>
      <Text as="h2" fontSize="2xl" textAlign="center" marginBlock="10">
        {product.name}
      </Text>
      <Text as="h3" fontSize="2xl" textAlign="center" marginBlock="10">
        {product.price}vnd
      </Text>

      <Box display="flex" justifyContent="center">
        <Image src={`http://localhost:8081/image/${product.image}`} />
      </Box>
      <Text mt="3rem" className={styles.description}>
        {product.description}
      </Text>
    </div>
  );
}

export default ProductDetailPage;
