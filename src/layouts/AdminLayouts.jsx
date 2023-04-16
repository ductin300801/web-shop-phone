import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminContainerLayout from './AdminContainerLayout';

function AdminLayouts() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage />} />
        <Route path='/*' element={<AdminContainerLayout />} />
    </Routes>
  )
}

export default AdminLayouts