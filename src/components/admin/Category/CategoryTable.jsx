import { TableContainer, Tbody, Td, Th, Thead, Tr, Table } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axiosCient from '../../../utils/axiosCLient'

function CategoryTable() {

  const [categories, setCategories] = useState([])


  useEffect(() => {
    axiosCient.get("/category")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <TableContainer width="100%">
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Tên danh mục</Th>
            <Th>Id</Th>
            <Th isNumeric>Tạo bởi</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CategoryTable