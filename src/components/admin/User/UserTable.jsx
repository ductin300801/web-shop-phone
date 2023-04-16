import React, { useEffect, useState } from 'react'
import axiosCient from '../../../utils/axiosCLient';
import { toast } from 'react-toastify';
import { IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axiosCient
      .get("/user")
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  const handleDel = async (userId) => {
    try {
      await axiosCient.delete("/user/" + userId);
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
          <Th>Tên đăng nhập</Th>
          <Th>Các quyền</Th>
          <Th>Thao tác</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => {
          return (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.fullname}</Td>
              <Td>{user.username}</Td>
              <Td>{user.roles.map((role => role.name)).join(",")}</Td>
              
              <Td
                sx={{
                  display: "flex",
                }}
              >
                <IconButton
                  colorScheme="yellow"
                  as={Link}
                  to={`/admin/user/update/${user.id}`}
                  state={user}
                >
                  <AiTwotoneEdit />
                </IconButton>

                <IconButton colorScheme="red" marginLeft="10px" onClick={() => handleDel(user.id)}>
                  <BsFillTrashFill />
                </IconButton>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  </TableContainer>
  )
}

export default UserTable