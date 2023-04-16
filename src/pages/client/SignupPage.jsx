import { Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AppContext } from "../../context/AppProvider";
import axiosCient from "../../utils/axiosCLient";
import { Navigate } from "react-router-dom";

const schema = Yup.object().shape({
  username: Yup.string().required("Bắt buộc"),
  password: Yup.string().required("Bắt buộc."),
  fullname: Yup.string().required("Bắt buộc."),
});

function SignupPage() {
  const { isLogin } = useContext(AppContext);

  const [submiting, setSubmiting] = useState(false);


  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    validationSchema: schema,
    initialValues: {
      password: "",
      username: "",
      fullname: "",
    },
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  const submitHandler = async (values) => {
    setSubmiting(true);
    try {
       await axiosCient.post("/account/register", {...values, role: "USER"});
      toast.success("Thành công!")
      resetForm()
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
        <Heading mb={6}>Đăng ký</Heading>
        <FormControl mb={3}>
          <Input
            id="username"
            name="username"
            placeholder="Nhập username..."
            type="text"
            variant="filled"
            value={values.username}
            onChange={handleChange}
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

        <FormControl mb={3}>
          <Input
            id="fullname"
            name="fullname"
            placeholder="Nhập họ tên..."
            type="text"
            variant="filled"
            value={values.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <Text
              sx={{
                marginLeft: "10px",
                fontSize: "13px",
                marginTop: "3px",
                color: "#e60202",
              }}
            >
              {errors.fullname}
            </Text>
          )}
        </FormControl>
        <FormControl mb={6}>
          <Input
            id="password"
            name="password"
            placeholder="Nhập mật khẩu..."
            type="text"
            variant="filled"
            value={values.password}
            onChange={handleChange}
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
        <Button type="submit" colorScheme="teal" mb={8} isLoading={submiting}>
          OK
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignupPage;
