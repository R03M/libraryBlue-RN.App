import { CORS_URL } from '@env';
import axios from 'axios';

export const getItems = async (idCompany, idAssociated) => {
  try {
    const response = await axios.post(`${CORS_URL}/item`, {
      idCompany,
      idAssociated,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postNewItem = async (item) => {
  try {
    const response = await axios.post(`${CORS_URL}/item/new`, {
      item,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
