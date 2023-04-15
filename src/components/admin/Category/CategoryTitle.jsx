import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function CategoryTitle() {
  const location = useLocation();

  const check =
    location.pathname.includes("add") || location.pathname.includes("update");
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text>Quản lý danh mục</Text>
      <Button
        as={Link}
        to={check ? "/admin/category" : "/admin/category/add"}
        colorScheme="blue"
      >
        {check ? "Quay lại" : "Thêm danh mục"}
      </Button>
    </Box>
  );
}

export default CategoryTitle;
