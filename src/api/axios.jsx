import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE || "http://localhost:8000/api";
const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("api-token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
