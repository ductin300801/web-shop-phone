import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
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
  const [priceSale, setPriceSale] = useState(0);
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!state) return;
    setProductValue(state.name);
    setDiscription(state.description);
    setPrice(state.price);
    setPriceSale(state.priceSale);
    setCategorySelected(state.category.id);
    setPreviewImage(`http://localhost:8081/image/${state.image}`);
  }, [location]);

  useEffect(() => {
    axiosCient
      .get("/category")
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categorySelected) return;
    if (!discription) return;
    if (!productValue) return;
    if (price === 0 || !price) return;
    if (state) {
    console.log("alo1");

      try {
        const formData = new FormData();
        formData.append("name", productValue);
        formData.append("description", discription);
        formData.append("catId", categorySelected);
        formData.append("priceSale", priceSale);
        formData.append("price", price);
        if (file) {
          formData.append("imageFile", file);
        }
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
    console.log("alo2");

      try {
        if (!file) return;
        const formData = new FormData();
        formData.append("name", productValue);
        formData.append("description", discription);
        formData.append("catId", categorySelected);
        formData.append("price", price);
        formData.append("priceSale", priceSale);
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
          <FormLabel>Giá khuyến mãi</FormLabel>
          <Input
            type="number"
            value={priceSale}
            onChange={(e) => setPriceSale(e.target.value)}
            placeholder="Nhập giá khuyến mãi..."
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
        <Box mt="10px" display="flex">
          <FormControl width="300px" marginRight="20px">
            <FormLabel>Ảnh</FormLabel>
            <Input type="file" onChange={handleChangeFile} />
          </FormControl>
          <Image src={previewImage} width="300px" />
        </Box>
        <Button type="submit" isFullWidth mt="10px" colorScheme="blue">
          Thêm
        </Button>
      </form>
    </Box>
  );
}

export default ProductForm;
