import axios from "axios";



const axiosCient = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Cotent-Type": "application/json",
        "Authorization": localStorage.getItem("accessToken") ? `Bearer ${localStorage.getItem("accessToken")}` : null
    }
})

axiosCient.interceptors.response.use((response) => {
    if (response.data.data) {
        return response.data.data
    }
    return response.data
}, (error) => {
    return Promise.reject(error);
})

export default axiosCient