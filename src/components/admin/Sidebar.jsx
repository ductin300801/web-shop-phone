import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import LOGO from "../../assets/logo.png"

function ItemLink({ children, ...props }) {

  return (
    <Box
      {...props}
      as={Link}
      sx={{
        width: "100%",
        padding: "8px 16px",
        color: "#000",
        "&:hover": {
          bgColor: "#dddd"
        }
      }}
    >
      {children}
    </Box>
  )
}

function Sidebar() {
  return (
    <Box width="270px" boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px" position="fixed" left="0" height="100vh" zIndex={99}>
      <Box p="20px" textAlign="center">
        <Image src={LOGO} />
      </Box>
      <ItemLink to="/admin/dashboard" fontWeight="bold">
        Bảng điều khiển
      </ItemLink>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                Sản phẩm
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/product" fontSize="14px" fontStyle="italic">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                Danh mục
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/category" fontSize="14px" fontStyle="italic">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                Banner
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/banner" fontSize="14px" fontStyle="italic">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                Đơn hàng
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/order" fontSize="14px" fontStyle="italic">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                Người dùng
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/user" fontSize="14px" fontStyle="italic">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Sidebar