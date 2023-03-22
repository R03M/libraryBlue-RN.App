import { CORS_URL } from "@env";
import axios from "axios";

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${CORS_URL}/company/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
