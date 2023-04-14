import { CORS_URL } from '@env';
import axios from 'axios';

export const validateUser = async (userData, token) => {
  const instance = axios.create({
    timeout: 180000,
    timeoutErrorMessage: 'SERVER OFFLINE',
  });
  try {
    const response = await instance.post(
      `${CORS_URL}/user/validate`,
      userData,
      {
        headers: {
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data, token) => {
  try {
    const response = await axios.put(
      `${CORS_URL}/user/update`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putPositionUser = async (data, token) => {
  try {
    const response = await axios.put(
      `${CORS_URL}/user/changePosition`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (idUser, token) => {
  try {
    const response = await axios.delete(
      `${CORS_URL}/user/delete`,

      {
        headers: {
          Authorization: `Beaner ${token}`,
        },
        data: {
          idUser,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
