import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function BannerTitle() {
    const check =
    location.pathname.includes("add") || location.pathname.includes("update");
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" pr="20px">
      <Text fontSize="24px">Quản lý danh mục</Text>
      <Button
        as={Link}
        to={check ? "/admin/banner" : "/admin/banner/add"}
        colorScheme="blue"
      >
        {check ? "Quay lại" : "Thêm banner"}
      </Button>
    </Box>
  )
}

export default BannerTitle