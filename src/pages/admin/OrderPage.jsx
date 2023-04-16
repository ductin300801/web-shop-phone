import { Box } from '@chakra-ui/react'
import React from 'react'
import OrderTitle from '../../components/admin/Order/OrderTitle'
import OrderTable from '../../components/admin/Order/OrderTable'
import OrderDetail from '../../components/admin/Order/OrderDetail'
import { Route, Routes } from 'react-router-dom'

function OrderPage() {
  return (
    <Box>
    <OrderTitle />
    <Box width="100%" marginTop="24px">
      <Routes>
        <Route path="/" element={<OrderTable />} />
        <Route path="/detail/:orderId" element={<OrderDetail />} />
      </Routes>
    </Box>
  </Box>
  )
}

export default OrderPage