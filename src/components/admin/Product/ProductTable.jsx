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

function ProductTable() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axiosCient
      .get("/product")
      .then((response) => {
        setProducts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDel = async (productId) => {
    try {
      await axiosCient.delete("/product/" + productId);
      toast.success("Xóa thành công");
      getAll();
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Ảnh</Th>
            <Th>Tên sản phẩm</Th>
            <Th>Tên danh mục</Th>
            <Th>Giá</Th>
            <Th>Giá khuyến mãi</Th>
            <Th>Thời gian</Th>
            <Th>Tạo bởi</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => {
            return (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{<img width="100px" src={`http://localhost:8081/image/${product.image}`} />}</Td>
                <Td>{product.name}</Td>
                <Td>{product.category.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.priceSale}</Td>
                <Td>{product.updatedAt}</Td>
                <Td>{product.user.username}</Td>
                <Td
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    colorScheme="yellow"
                    as={Link}
                    to={`/admin/product/update/${product.id}`}
                    state={product}
                  >
                    <AiTwotoneEdit />
                  </IconButton>

                  <IconButton
                    colorScheme="red"
                    marginLeft="10px"
                    onClick={() => handleDel(product.id)}
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

export default ProductTable;
