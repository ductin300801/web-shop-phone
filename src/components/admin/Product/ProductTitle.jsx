import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function ProductTitle() {

  const location = useLocation();

  const check =
    location.pathname.includes("add") || location.pathname.includes("update");
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text>Quản lý sản phẩm</Text>
      <Button
        as={Link}
        to={check ? "/admin/product" : "/admin/product/add"}
        colorScheme="blue"
      >
        {check ? "Quay lại" : "Thêm sản phẩm"}
      </Button>
    </Box>
  )
}

export default ProductTitle