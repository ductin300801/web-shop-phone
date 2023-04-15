import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'
import Topbar from '../components/admin/Topbar'
import CategoryPage from '../pages/admin/CategoryPage'
import DashboardPage from '../pages/admin/DashboardPage'
import ProductPage from '../pages/admin/ProductPage'
import UserPage from '../pages/admin/UserPage'
import { AppContext } from '../context/AppProvider'

function AdminContainerLayout() {
  const { isLogin } = useContext(AppContext)

  if (!isLogin) {
    return <Navigate to={"/admin/login"} />
  }

  return (
    <Box
      width="100%"
      display="flex"
    >
      <Sidebar />
      <Box flex="1">
        <Topbar />
        <Box marginLeft="20px">
          <Routes>
            <Route path='/' element={<Navigate to="/admin/dashboard" />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            {/* product */}
            <Route path='/product/*' element={<ProductPage />} />
            {/* category */}
            <Route path='/category/*' element={<CategoryPage />} />
            {/* user */}
            <Route path='/user/*' element={<UserPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminContainerLayout