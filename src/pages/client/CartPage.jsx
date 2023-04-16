import {
  Box,
  Button,
  FormControl,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { useCart } from "../../context/CartProvider";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import TextArea from "antd/lib/input/TextArea";
import axiosCient from "../../utils/axiosCLient";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  address: Yup.string().required("Bắt buộc"),
  phone: Yup.string().required("Bắt buộc."),
  note: Yup.string().required("Bắt buộc."),
});

function CartPage() {
  const { cart, onClear, onIncrease, onDescrease, onRemove } = useCart();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submiting, setSubmiting] = useState(false);

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    validationSchema: schema,
    initialValues: {
      address: "",
      phone: "",
      note: "",
    },
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const amount = useMemo(() => {
    const result = cart.reduce((prev, curr) => {
      const price = curr.priceSale ? curr.priceSale : curr.price;
      return prev + price * curr.quantity;
    }, 0);
    return result;
  }, [cart]);

  const submitHandler = async (values) => {
    if (cart.length === 0) return;
    const newCart = cart.map((item) => ({
      quantity: item.quantity,
      productId: item.id,
    }));
    const requestBody = {
      ...values,
      products: newCart,
    };
    try {
        await axiosCient.post("/order", requestBody)
        toast.success("Thanh toán thành công!")
        onClear()
        
    } catch (error) {
        toast.error("Đã xảy ra lỗi")
    }
  };

  return (
    <Box sx={{ padding: "1rem 3rem" }}>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Ảnh</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Giá</Th>
              <Th>Số lượng</Th>
              <Th>Tổng giá</Th>
              <Th>Tùy chọn</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cart.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Image
                    src={"http://localhost:8081/image/" + item.image}
                    width="80px"
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.priceSale ? item.priceSale : item.price}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  {item.priceSale
                    ? item.priceSale * item.quantity
                    : item.price * item.quantity}
                </Td>
                <Td>
                  <IconButton
                    colorScheme="gray"
                    onClick={() => onIncrease(item.id)}
                  >
                    <AiOutlinePlus />
                  </IconButton>
                  <IconButton
                    colorScheme="gray"
                    ml="5px"
                    onClick={() => onDescrease(item.id)}
                  >
                    <AiOutlineMinus />
                  </IconButton>
                  <IconButton
                    colorScheme="gray"
                    ml="5px"
                    onClick={() => onRemove(item.id)}
                  >
                    <AiOutlineClose />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="24px"
      >
        <Box display="flex" alignItems="center">
          <Text color="#000" fontSize="1.3rem" fontWeight="bold">
            Tổng giá tiền:
          </Text>
          <Text marginLeft="5px">{amount} vnd</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Button colorScheme="gray" as={Link} to="/">
            Quay lại trang chủ
          </Button>
          <Button colorScheme="red" marginLeft="12px" onClick={onClear}>
            Xóa giỏ hàng
          </Button>
          <Button colorScheme="blue" marginLeft="12px" onClick={onOpen}>
            Thanh toán
          </Button>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanh toán</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form" onSubmit={handleSubmit}>
              <FormControl mb={3}>
                <Input
                  id="address"
                  name="address"
                  placeholder="Nhập địa chỉ..."
                  type="text"
                  variant="filled"
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <Text
                    sx={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      marginTop: "3px",
                      color: "#e60202",
                    }}
                  >
                    {errors.address}
                  </Text>
                )}
              </FormControl>
              <FormControl mb={3}>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Nhập sdt..."
                  type="text"
                  variant="filled"
                  value={values.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <Text
                    sx={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      marginTop: "3px",
                      color: "#e60202",
                    }}
                  >
                    {errors.phone}
                  </Text>
                )}
              </FormControl>
              <FormControl mb={3}>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Nhập ghi chú..."
                  type="text"
                  variant="filled"
                  value={values.note}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.note && (
                  <Text
                    sx={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      marginTop: "3px",
                      color: "#e60202",
                    }}
                  >
                    {errors.note}
                  </Text>
                )}
              </FormControl>
              <Box textAlign="right" padding="1rem">
                <Button type="submit" colorScheme="blue">
                  Xác nhận
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CartPage;
