import React, { useEffect, useState } from "react";
import axiosCient from "../../../utils/axiosCLient";
import { toast } from "react-toastify";
import { IconButton, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function BannerTable() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axiosCient
      .get("/banner")
      .then((response) => {
        setBanners(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDel = async (catId) => {
    try {
      await axiosCient.delete("/banner/" + catId);
      toast.success("Xóa thành công");
      getAll();
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };
  return (
    <TableContainer width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Preview</Th>
            <Th>Tạo bởi</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {banners.map((banner) => {
            return (
              <Tr key={banner.id}>
                <Td>{banner.id}</Td>
                <Td>
                  <Image src={"http://localhost:8081/image/" + banner.imageUrl} width="100px"/>
                </Td>
                <Td>{banner.user.username}</Td>
                <Td
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    colorScheme="red"
                    marginLeft="10px"
                    onClick={() => handleDel(banner.id)}
                  >
                    <BsFillTrashFill />
                  </IconButton>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default BannerTable;
