import { createAsyncThunk } from '@reduxjs/toolkit';
import { putPositionUser, updateUserProfile } from '../services/user.js';
import {
  deleteCompany,
  deleteUserOfCompany,
  getCompanies,
  postAllCompanyUser,
  postNewCompany,
  postSelectCompany,
  postUpdateCompany,
} from '../services/company.js';
import {
  deleteAItem,
  getItems,
  postCreateManyItems,
  postNewItem,
  postUpdateItem,
} from '../services/item.js';
import { postCheckEmail, postLogIn } from '../services/auth.js';
import {
  LS_TOKENACCESS,
  LS_USERDATA,
  lsSetItems,
} from '../utils/localStorage.js';

export const checkEmail = createAsyncThunk('user/checkEmail', async (email) => {
  const response = await postInfEmail(email);
  return response;
});

export const loginAccount = createAsyncThunk(
  'user/loginAccount',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await postLogIn(email, password);
      await lsSetItems(LS_USERDATA, response.userData);
      await lsSetItems(LS_TOKENACCESS, response.token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const checkEmailToRegister = createAsyncThunk(
  'user/checkEmailToRegister',
  async (email) => {
    const response = await postCheckEmail(email);
    return response;
  }
);

export const registerAccount = createAsyncThunk(
  'user/registerAccount',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await postRegisterUser(data);
      await lsSetItems(LS_USERDATA, response.userData);
      await lsSetItems(LS_TOKENACCESS, response.token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  'company/getAllCompanies',
  async ({ idCompany, token }) => {
    try {
      const response = await getCompanies(idCompany, token);
      if (response.data) {
        return response.data;
      }
      return 'No companies';
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createNewCompany = createAsyncThunk(
  'user/createNewCompany',
  async ({ company, token }) => {
    try {
      const response = await postNewCompany(company, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const newUserSelectCompany = createAsyncThunk(
  'company/select',
  async ({ selectCompanyInf, token }) => {
    try {
      const response = await postSelectCompany(selectCompanyInf, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllItems = createAsyncThunk(
  'item/all',
  async ({ idCompany, idAssociated, token }) => {
    try {
      const response = await getItems(idCompany, idAssociated, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createNewItem = createAsyncThunk(
  'item/createNewItem',
  async ({ item, token }) => {
    try {
      const response = await postNewItem(item, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async ({ idItem, idUser, token }) => {
    try {
      const response = await deleteAItem(idItem, idUser, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_UpdateItem = createAsyncThunk(
  'item/updateItem',
  async ({ updateItem, token }) => {
    try {
      const response = await postUpdateItem(updateItem, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_UpdateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ updateProfile, token }) => {
    try {
      const response = await updateUserProfile(updateProfile, token);
      await lsSetItems(LS_USERDATA, response.userData);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_getAllCompanyUsers = createAsyncThunk(
  'company/getAllCompanyUsers',
  async ({ companyName, token }) => {
    try {
      const response = await postAllCompanyUser(companyName, token);
      if (response.data) {
        return response.data;
      }
      return response.status;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_CreateManyItems = createAsyncThunk(
  'items/createManyItems',
  async ({ idCompany, associatedCompany, data, token }) => {
    try {
      const response = await postCreateManyItems(
        idCompany,
        associatedCompany,
        data,
        token
      );
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_UpdateCompany = createAsyncThunk(
  'company/update',
  async ({ dataCompany, token }) => {
    try {
      const response = await postUpdateCompany(dataCompany, token);

      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_UpdatePositionUser = createAsyncThunk(
  'user/updatePositionUser',
  async ({ data, token }) => {
    try {
      const response = await putPositionUser(data, token);
      if (response.data) {
        return response.data;
      }
      return response.status;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_RemoveUserOfCompany = createAsyncThunk(
  'company/removeUserOfCompany',
  async ({ idUser, token }) => {
    try {
      const response = await deleteUserOfCompany(idUser, token);
      if (response.data) {
        return response.data;
      }
      return response.status;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_DisconnectOfCompany = createAsyncThunk(
  'user/disconnectOfCompany',
  async ({ idUser, token }) => {
    try {
      const response = await deleteUserOfCompany(idUser, token);
      if (response.data) {
        return response.data;
      }
      return response.status;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_ChangeTypeAccount = createAsyncThunk(
  'user/changeTypeAccount',
  async ({ data, token }) => {
    try {
      const response = await putPositionUser(data, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const action_DeleteCompany = createAsyncThunk(
  'user/deleteCompany',
  async ({ idCompany, token }) => {
    try {
      const response = await deleteCompany(idCompany, token);
      return response;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
