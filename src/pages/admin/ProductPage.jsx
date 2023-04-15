import { Box } from "@chakra-ui/react";
import React from "react";
import ProductTitle from "../../components/admin/Product/ProductTitle";
import ProductTable from "../../components/admin/Product/ProductTable";
import ProductForm from "../../components/admin/Product/ProductForm";
import { Route, Routes } from "react-router-dom";

function ProductPage() {
  return (
    <Box>
      <ProductTitle />
      <Box width="100%" marginTop="24px">
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/update/:catId" element={<ProductForm />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default ProductPage;
