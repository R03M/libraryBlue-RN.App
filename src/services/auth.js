import { CORS_URL } from '@env';
import axios from 'axios';

export const postCheckEmail = async (email) => {
  const response = await axios.post(`${CORS_URL}/auth/checkEmail`, {
    email,
  });
  return response.data;
};

export const postSignIn = async (data) => {
  try {
    const response = await axios.post(`${CORS_URL}/auth/singIn`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLogIn = async (email, password) => {
  try {
    const response = await axios.post(`${CORS_URL}/auth/logIn`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLogOut = async (idUser) => {
  try {
    const response = await axios.post(`${CORS_URL}/auth/logOut`, {
      idUser,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
