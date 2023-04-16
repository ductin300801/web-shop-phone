import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import CategoryPage from "../pages/admin/CategoryPage";
import DashboardPage from "../pages/admin/DashboardPage";
import ProductPage from "../pages/admin/ProductPage";
import UserPage from "../pages/admin/UserPage";
import { AppContext } from "../context/AppProvider";
import axiosCient from "../utils/axiosCLient";
import BannerPage from "../pages/admin/BannerPage";
import OrderPage from "../pages/admin/OrderPage";

function AdminContainerLayout() {
  const { isLogin } = useContext(AppContext);
  if (!isLogin) {
    return <Navigate to={"/admin/login"} />;
  }
  return (
    <Box width="100%" display="flex">
      <Sidebar />
      <Box flex="1" maxW="100%" paddingLeft="270px">
        <Topbar />
        <Box marginLeft="20px">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* product */}
            <Route path="/product/*" element={<ProductPage />} />
            {/* category */}
            <Route path="/category/*" element={<CategoryPage />} />
            {/* user */}
            <Route path="/user/*" element={<UserPage />} />
            {/* banner */}
            <Route path="/banner/*" element={<BannerPage />} />
            {/* banner */}
            <Route path="/order/*" element={<OrderPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminContainerLayout;
