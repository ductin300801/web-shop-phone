import React from "react";
import UserTitle from "../../components/admin/User/UserTitle";
import UserTable from "../../components/admin/User/UserTable";
import UserForm from "../../components/admin/User/UserForm";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function UserPage() {
  return (
    <Box>
      <UserTitle />
      <Box width="100%" marginTop="24px">
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/update/:userId" element={<UserForm />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default UserPage;
