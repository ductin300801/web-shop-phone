import {
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosCient from "../../../utils/axiosCLient";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CategoryTable() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axiosCient
      .get("/category")
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDel = async (catId) => {
    try {
      await axiosCient.delete("/category/" + catId);
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
            <Th>Tên danh mục</Th>
            <Th>Tạo bởi</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => {
            return (
              <Tr key={category.id}>
                <Td>{category.id}</Td>
                <Td>{category.name}</Td>
                <Td>{category.user.username}</Td>
                <Td
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    colorScheme="yellow"
                    as={Link}
                    to={`/admin/category/update/${category.id}`}
                    state={category}
                  >
                    <AiTwotoneEdit />
                  </IconButton>

                  <IconButton colorScheme="red" marginLeft="10px" onClick={() => handleDel(category.id)}>
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

export default CategoryTable;
