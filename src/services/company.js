import { CORS_URL } from '@env';
import axios from 'axios';

export const getCompanies = async (idCompany, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/company/all`,
      { idCompany },
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

export const postNewCompany = async (company, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/company/new`,
      {
        company,
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

export const postSelectCompany = async (selectCompanyInf, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/company/selectCompany`,
      {
        selectCompanyInf,
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

export const postAllCompanyUser = async (companyName, token) => {
  try {
    const response = await axios.post(
      `${CORS_URL}/company/allCompanyUsers`,
      {
        companyName,
      },
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

export const postUpdateCompany = async (dataCompany, token) => {
  try {
    const response = await axios.put(
      `${CORS_URL}/company/update`,
      {
        dataCompany,
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

export const deleteUserOfCompany = async (idUser, token) => {
  try {
    const response = await axios.delete(`${CORS_URL}/company/rmUserOfCompany`, {
      data: {
        idUser,
      },
      headers: {
        Authorization: `Beaner ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCompany = async (idCompany, token) => {
  try {
    const response = await axios.delete(`${CORS_URL}/company/deleteCompany`, {
      data: {
        idCompany,
      },
      headers: {
        Authorization: `Beaner ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disconnectCompanyAssoc = async (idCompany, token) => {
  try {
    const response = await axios.put(
      `${CORS_URL}/company/disconnectCopAssoc`,
      { idCompany },
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
