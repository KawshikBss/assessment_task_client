import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
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
