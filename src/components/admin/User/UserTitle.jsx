import { Box, Text } from "@chakra-ui/react";
import React from "react";

function UserTitle() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pr="20px"
    >
      <Text fontSize="24px">Quản lý người dùng</Text>
    </Box>
  );
}
export default UserTitle;
