import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

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
    <Box width="270px" boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px">
      <Box p="20px" textAlign="center">
        Logo
      </Box>
      <ItemLink to="/admin/dashboard">
        Bảng điều khiển
      </ItemLink>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Sản phẩm
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/product">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Danh mục
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/category">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
                Người dùng
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p="0">
            <ItemLink to="/admin/user">
              Danh sách
            </ItemLink>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default Sidebar