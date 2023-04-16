import { Box, Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosCient from "../../../utils/axiosCLient";
import { toast } from "react-toastify";

function BannerForm() {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("");


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
    if (!file) return;
    try {
        const formData = new FormData();
        formData.append("imageFile", file)
        await axiosCient.post("/banner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Thêm thành công");
        setFile(null);
      } catch (error) {
        toast.error("Đã xảy ra lỗi");
      }
  };
  return (
    <Box padding="20px">
      <form onSubmit={handleSubmit}>
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

export default BannerForm;
