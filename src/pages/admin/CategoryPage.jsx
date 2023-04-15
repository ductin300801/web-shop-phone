import React from "react";
import CategoryTitle from "../../components/admin/Category/CategoryTitle";
import CategoryTable from "../../components/admin/Category/CategoryTable";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CategoryForm from "../../components/admin/Category/CategoryForm";

function CategoryPage() {
  return (
    <Box>
      <CategoryTitle />
      <Box width="100%" marginTop="24px">
        <Routes>
          <Route path="/" element={<CategoryTable />} />
          <Route path="/add" element={<CategoryForm />} />
          <Route path="/update/:catId" element={<CategoryForm />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default CategoryPage;
