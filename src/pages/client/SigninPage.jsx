import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { AppContext } from "../../context/AppProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosCient from "../../utils/axiosCLient";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc"),
  password: Yup.string().required("Bắt buộc."),
});

function SigninPage() {
  const { isLogin, setIsLogin, setUserLogin } = useContext(AppContext);

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

  const submitHandler = async (values) => {
    setSubmiting(true);
    try {
      const response = await axiosCient.post("/jwt/login", values);
      sessionStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          username: response.username,
          fullname: response.fullname,
        })
      );
      setIsLogin(true);
      setUserLogin({
        username: response.username,
        fullname: response.fullname,
      });
      navigate("/");
    } catch (error) {
      toast.error("Đã xảy ra lỗi");
    } finally {
      setSubmiting(false);
    }
  };

  if(isLogin) {
    return (
        <Navigate to={-1} />
    )
  }

  return (
    <Flex marginTop="60px" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        p={12}
        borderRadius={8}
        boxShadow="lg"
        as="form"
        onSubmit={handleSubmit}
      >
        <Heading mb={6}>Đăng nhập</Heading>
        <FormControl mb={3}>
          <Input
            id="username"
            name="username"
            placeholder="Nhập username..."
            type="text"
            variant="filled"
            onChange={handleChange}
            value={values.username}
          />
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
        <FormControl mb={6}>
          <Input
            id="password"
            name="password"
            placeholder="Nhập mật khẩu..."
            type="password"
            variant="filled"
            onChange={handleChange}
            value={values.password}
          />
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
        <Button isLoading={submiting} type="submit" colorScheme="teal" mb={8}>
          OK
        </Button>
      </Flex>
    </Flex>
  );
}

export default SigninPage;
