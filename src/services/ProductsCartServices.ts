import { axiosInstance } from "./axiosIntance";

export const getSingleProduct = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting single product:", error);
    throw error;
  }
};