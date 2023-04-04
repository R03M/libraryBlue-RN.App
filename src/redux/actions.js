import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  postInfEmail,
  postLoginUser,
  postRegisterUser,
  updateUserProfile,
} from '../services/user.js';
import {
  getCompanies,
  postAllCompanyUser,
  postNewCompany,
  postSelectCompany,
} from '../services/company.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  deleteAItem,
  getItems,
  postNewItem,
  postUpdateItem,
} from '../services/item.js';

export const checkEmail = createAsyncThunk('user/checkEmail', async (email) => {
  const response = await postInfEmail(email);
  return response;
});

export const loginAccount = createAsyncThunk(
  'user/loginAccount',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await postLoginUser(email, password);
      await AsyncStorage.setItem(
        '@UserData',
        JSON.stringify(response.userData)
      );
      await AsyncStorage.setItem(
        '@TokenAccess',
        JSON.stringify(response.token)
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

export const checkEmailToRegister = createAsyncThunk(
  'user/checkEmailToRegister',
  async (email) => {
    const response = await postInfEmail(email);
    return response;
  }
);

export const registerAccount = createAsyncThunk(
  'user/registerAccount',
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await postRegisterUser(data);
      await AsyncStorage.setItem(
        '@UserData',
        JSON.stringify(response.userData)
      );
      await AsyncStorage.setItem(
        '@TokenAccess',
        JSON.stringify(response.token)
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

export const getAllCompanies = createAsyncThunk(
  'company/getAllCompanies',
  async () => {
    try {
      const response = await getCompanies();
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
export const updateDataUser = createAsyncThunk(
  'user/updateDataUser',
  async (response) => {
    return response;
  }
);

export const createNewCompany = createAsyncThunk(
  'company/createNewCompany',
  async ({ company }) => {
    try {
      const response = await postNewCompany(company);
      dispatch(updateDataUser(response.user));
      return response.company;
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
  async ({ selectCompanyInf }) => {
    try {
      const response = await postSelectCompany(selectCompanyInf);
      dispatch(updateDataUser(response.user));
      return response.message;
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
  async ({ idCompany, idAssociated }) => {
    try {
      const response = await getItems(idCompany, idAssociated);
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
  async ({ item }) => {
    try {
      const response = await postNewItem(item);
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
  async ({ idItem }) => {
    try {
      const response = await deleteAItem(idItem);
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
  async ({ updateItem }) => {
    try {
      const response = await postUpdateItem(updateItem);
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
  async ({ updateProfile }) => {
    try {
      const response = await updateUserProfile(updateProfile);
      await AsyncStorage.setItem(
        '@UserData',
        JSON.stringify(response.userData)
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

export const action_getAllCompanyUsers = createAsyncThunk(
  'user/getAllCompanyUsers',
  async ({ companyName }) => {
    try {
      const response = await postAllCompanyUser(companyName);
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
