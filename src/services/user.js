import { CORS_URL } from "@env";
import axios from "axios";

export const postInfEmail = async (email) => {
  const response = await axios.post(`${CORS_URL}/register/checkEmail`, {
    email,
  });
  return response.data;
};

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

export const postRegisterUser = async (data) => {
  try {
    const response = await axios.post(`${CORS_URL}/register/new`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axios.put(`${CORS_URL}/user/update`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


