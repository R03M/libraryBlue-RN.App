import { CORS_URL } from '@env';
import axios from 'axios';

export const getCompanies = async (idCompany) => {
  try {
    const response = await axios.post(`${CORS_URL}/company/all`, { idCompany });
    return response;
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

export const postSelectCompany = async (selectCompanyInf) => {
  try {
    const response = await axios.post(`${CORS_URL}/company/selectCompany`, {
      selectCompanyInf,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAllCompanyUser = async (companyName) => {
  try {
    const response = await axios.post(`${CORS_URL}/company/allCompanyUsers`, {
      companyName,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
