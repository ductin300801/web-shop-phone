import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import axiosCient from "../../../utils/axiosCLient";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";

function CategoryForm() {
  const location = useLocation();
  const { state } = location;
  const [categoryValue, setCategoryValue] = useState("");

  useEffect(() => {
    if(!state) return
    setCategoryValue(state.name);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryValue) return;
    if (state) {
      try {
        await axiosCient.put("/category/" + state.id, { name: categoryValue });
        toast.success("Sửa thành công");
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    } else {
      try {
        await axiosCient.post("/category", { name: categoryValue });
        toast.success("Thêm thành công");
        setCategoryValue("");
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    }
  };

  return (
    <Box padding="20px">
      <form onSubmit={handleSubmit}>
        <Input
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          placeholder="Nhập tên danh mục..."
        />
        <Button type="submit" isFullWidth mt="10px" colorScheme="blue">
          Thêm
        </Button>
      </form>
    </Box>
  );
}

export default CategoryForm;
