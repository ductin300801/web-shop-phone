import { Box, Text } from '@chakra-ui/react'
import React from 'react'

function OrderTitle() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pr="20px">
      <Text fontSize="24px">Quản lý đơn hàng</Text>
    </Box>
  )
}

export default OrderTitle