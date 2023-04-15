import { CORS_URL } from '@env';
import axios from 'axios';

export const getItems = async (idCompany, associatedCompany, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/item`,
      {
        idCompany,
        associatedCompany,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
          'Content-Type': 'application/json',
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAItem = async (idItem, idUser, token) => {
  try {
    const response = await axios.delete(`${CORS_URL}/item/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Beaner ${token}`,
      },
      data: { idItem, idUser },
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
          'Content-Type': 'application/json',
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postCreateManyItems = async (
  idCompany,
  associatedCompany,
  data,
  token
) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/item/createManyI`,
      {
        idCompany,
        associatedCompany,
        data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beaner ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
