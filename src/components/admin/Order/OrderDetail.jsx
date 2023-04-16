import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosCient from "../../../utils/axiosCLient";
import { Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function OrderDetail() {
  const { orderId } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getAll();
  }, [orderId]);

  const getAll = () => {
    axiosCient
      .get("/order/detail/" + orderId)
      .then((response) => {
        setDetails(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TableContainer width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Ảnh</Th>
            <Th>Tên sản phẩm</Th>
            <Th>Giá</Th>
            <Th>Giá khuyến mãi</Th>
            <Th>Số lượng</Th>
            <Th>Tổng giá</Th>
          </Tr>
        </Thead>
        <Tbody>
          {details.map((detail) => {
            return (
              <Tr key={detail.id}>
                <Td>{detail.id}</Td>
                <Td>
                  {
                    <Image
                      src={
                        "http://localhost:8081/image/" + detail.product.image
                      }
                      width="100px"
                    />
                  }
                </Td>
                <Td>{detail.product.name}</Td>
                <Td>{detail.product.price}</Td>
                <Td>{detail.product.priceSale}</Td>
                <Td>{detail.quantity}</Td>
                <Td>
                  {detail.product.priceSale
                    ? detail.product.priceSale * detail.quantity
                    : detail.product.price * detail.quantity}
                  vnd
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default OrderDetail;
