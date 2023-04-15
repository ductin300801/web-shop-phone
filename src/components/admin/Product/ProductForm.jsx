import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axiosCient from "../../../utils/axiosCLient";
import { toast } from "react-toastify";

function ProductForm() {
  const location = useLocation();
  const { state } = location;
  const [productValue, setProductValue] = useState("");
  const [discription, setDiscription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState();

  useEffect(() => {
    axiosCient
      .get("/category")
      .then((response) => {
        setCategories(response);
        setCategorySelected(response[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categorySelected) return;
    if (!discription) return;
    if (!productValue) return;
    if (!price) return;
    if (state) {
      try {
        const formData = new FormData();
        formData.append("name", productValue);
        formData.append("description", discription);
        formData.append("catId", categorySelected);
        formData.append("price", price);
        formData.append("imageFile", file);
        await axiosCient.put("/product/" + state.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Sửa thành công");
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    } else {
      try {
        if (!file) return;
        const formData = new FormData();
        formData.append("name", productValue);
        formData.append("description", discription);
        formData.append("price", price);
        formData.append("catId", categorySelected);
        formData.append("imageFile", file);
        await axiosCient.post("/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Thêm thành công");
        setProductValue("");
        setCategorySelected(undefined);
        setDiscription("");
        setFile();
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
    }
  };

  return (
    <Box padding="20px">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Tên sản phẩm</FormLabel>
          <Input
            value={productValue}
            onChange={(e) => setProductValue(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Thuộc loại danh mục</FormLabel>
          <Select
            placeholder="Select option"
            value={categorySelected}
            onChange={(e) => {
              setCategorySelected(e.target.value);
            }}
          >
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Giá</FormLabel>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Nhập giá..."
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Chi tiết</FormLabel>
          <Textarea
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
            placeholder="Nhập chi tiết..."
            rows={3}
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Ảnh</FormLabel>
          <Input type="file" onChange={handleChangeFile} />
        </FormControl>
        <Button type="submit" isFullWidth mt="10px" colorScheme="blue">
          Thêm
        </Button>
      </form>
    </Box>
  );
}

export default ProductForm;
