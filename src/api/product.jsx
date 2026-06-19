import axiosInstance from "./axios";

export const getAllProducts = async (page) => {
    const response = await axiosInstance.get(`/products?page=${page}`);
    return response.data;
};

export const getSingleProduct = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (data) => {
    const response = await axiosInstance.post("/products", data);
    return response.data;
};

export const updateProduct = async (id, data) => {
    const response = await axiosInstance.put(`/products/${id}`, data,{method:'PUT'});
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
};
