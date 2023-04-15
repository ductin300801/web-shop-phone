import axios from "axios";

const axiosCient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    Authorization: sessionStorage.getItem("accessToken")
      ? `Bearer ${sessionStorage.getItem("accessToken")}`
      : null,
  },
});

axiosCient.interceptors.response.use(
  (response) => {
    if (response.data.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data.message !== "invalid username or password"
      ) {
        localStorage.removeItem("userLogin");
        sessionStorage.removeItem("accessToken")
        location.href = "/admin/login";
      }
      // Nếu có response từ server trả về
      return Promise.reject({
        message: error.message,
        code: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Nếu request được gửi nhưng không nhận được response
      return Promise.reject({
        message: error.message,
        code: "REQUEST_ERROR",
      });
    } else {
      // Lỗi không thể được xác định
      return Promise.reject({
        message: error.message,
        code: "UNKNOWN_ERROR",
      });
    }
  }
);

export default axiosCient;
