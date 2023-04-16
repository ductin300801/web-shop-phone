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
      const { data } = error.response;
      if (data.message === "Unauthorized" && error.response.status === 401) {
        sessionStorage.getItem("accessToken") &&
          sessionStorage.removeItem("accessToken");
        localStorage.getItem("userLogin") &&
          localStorage.removeItem("userLogin");
        window.location.reload();
      }
    }
    Promise.reject(error);
  }
);

export default axiosCient;
