import { CORS_URL } from "@env";
import axios from "axios";

export const postLoginUser = async (email, password) => {
  try {
    const response = await axios.post(`${CORS_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
