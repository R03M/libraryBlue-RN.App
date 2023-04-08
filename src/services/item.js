import { CORS_URL } from '@env';
import axios from 'axios';

export const getItems = async (idCompany, idAssociated, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/item`,
      {
        idCompany,
        idAssociated,
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

export const postNewItem = async (item, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/item/new`,
      {
        item,
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

export const deleteAItem = async (idItem, token) => {
  try {
    const response = await axios.delete(`${CORS_URL}/item/delete`, {
      headers: {
        Authorization: `Beaner ${token}`,
      },
      data: { idItem },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postUpdateItem = async (item, token) => {
  try {
    const response = await axios.put(
      `${CORS_URL}/item/update`,
      {
        item,
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

export const postCreateManyItems = async (idCompany, data, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/item/createManyI`,
      {
        idCompany,
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
