import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../context/AppProvider";

function Topbar() {
  const { userLogin } = useAuth()
  return (
    <Box
      bgColor="#ddd"
      padding={"20px 10px"}
      marginBottom="10px"
      display="flex"
      justifyContent="end"
      alignItems="center"
      position="sticky"
      top="0"
      zIndex={99}
    >
      <Text fontSize="16px" fontWeight="bold"> {userLogin?.fullname}</Text>
      <Button colorScheme="red" ml="12px">Đăng xuất</Button>
    </Box>
  );
}

export default Topbar;
