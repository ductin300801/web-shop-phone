import React from 'react'
import BannerTitle from '../../components/admin/Banner/BannerTitle'
import BannerTable from '../../components/admin/Banner/BannerTable'
import BannerForm from '../../components/admin/Banner/BannerForm'
import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

function BannerPage() {
  return (
    <Box>
      <BannerTitle />
      <Box width="100%" marginTop="24px">
        <Routes>
          <Route path="/" element={<BannerTable />} />
          <Route path="/add" element={<BannerForm />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default BannerPage