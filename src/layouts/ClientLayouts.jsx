

import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../components/client/Header'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/client/HomePage'
import ProductDetailPage from '../pages/client/ProductDetailPage'
import ContactPage from '../pages/client/ContactPage'

function ClientLayouts() {
  return (
    <Box>
      <Header />
      <Box>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product/:productId' element={<ProductDetailPage />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default ClientLayouts