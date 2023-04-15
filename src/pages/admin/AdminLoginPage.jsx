import { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/AppProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { useForm } from "antd/lib/form/Form";
import axiosCient from "../../utils/axiosCLient";
import { toast } from "react-toastify";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const schema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc"),
  password: Yup.string().required("Bắt buộc."),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  //   "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái và một số"
  // ),
});

const AdminLoginPage = () => {
  const { isLogin, setIsLogin, setUserLogin } = useContext(AppContext);

  const [showPassword, setShowPassword] = useState(false);

  const [submiting, setSubmiting] = useState(false);

  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    validationSchema: schema,
    initialValues: {
      password: "",
      username: "",
    },
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const handleShowClick = () => setShowPassword(!showPassword);

  const submitHandler = async (values) => {
    setSubmiting(true);
    try {
      const response = await axiosCient.post("/jwt/login", values);
      if (response.roles.includes("ADMIN")) {
        sessionStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem(
          "userLogin",
          JSON.stringify({
            username: response.username,
          })
        );
        setIsLogin(true);
        setUserLogin({
          username: response.username,
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setSubmiting(false);
    }
  };

  if (isLogin) {
    return <Navigate to={-1} />;
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Chào mừng</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nhập username"
                    onChange={handleChange}
                    value={values.username}
                  />
                </InputGroup>
                {errors.username && (
                  <Text
                    sx={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      marginTop: "3px",
                      color: "#e60202",
                    }}
                  >
                    {errors.username}
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <Text
                    sx={{
                      marginLeft: "10px",
                      fontSize: "13px",
                      marginTop: "3px",
                      color: "#e60202",
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={submiting}
              >
                Đăng nhập
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AdminLoginPage;
