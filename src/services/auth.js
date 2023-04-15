import { CORS_URL } from '@env';
import axios from 'axios';

export const postCheckEmail = async (email) => {
  const response = await axios.post(
    `${CORS_URL}/auth/checkEmail`,
    {
      email,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const postSignIn = async (data) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/auth/signIn`,
      {
        data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLogIn = async (email, password) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/auth/logIn`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postLogOut = async (idUser) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/auth/logOut`,
      {
        idUser,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
