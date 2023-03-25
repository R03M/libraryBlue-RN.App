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

export const postNewCompany = async (company) => {
  try {
    const response = await axios.post(`${CORS_URL}/company/new`, {
      company,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
