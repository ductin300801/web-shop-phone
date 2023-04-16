import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosCient from "../../../utils/axiosCLient";

function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axiosCient
      .get("/order")
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDel = async (orderId) => {
    try {
      await axiosCient.delete("/order/" + orderId);
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
            <Th>Tên người dùng</Th>
            <Th>Số điện thoại</Th>
            <Th>Địa chỉ</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => {
            return (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.user.fullname}</Td>
                <Td>{order.phone}</Td>
                <Td>{order.address}</Td>
                <Td
                  sx={{
                    display: "flex",
                  }}
                >
                  <IconButton
                    colorScheme="green"
                    as={Link}
                    to={`/admin/order/detail/${order.id}`}
                  >
                    <AiFillEye />
                  </IconButton>

                  <IconButton
                    colorScheme="red"
                    marginLeft="10px"
                    onClick={() => handleDel(order.id)}
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

export default OrderTable;
