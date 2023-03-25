import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  postInfEmail,
  postLoginUser,
  postRegisterUser,
} from "../services/user.js";
import { getCompanies, postNewCompany } from "../services/company.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkEmail = createAsyncThunk("user/checkEmail", async (email) => {
  const response = await postInfEmail(email);
  return response;
});

export const loginAccount = createAsyncThunk(
  "user/loginAccount",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await postLoginUser(email, password);
      await AsyncStorage.setItem(
        "@UserData",
        JSON.stringify(response.userData)
      );
      await AsyncStorage.setItem(
        "@TokenAccess",
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
  "user/checkEmailToRegister",
  async (email) => {
    const response = await postInfEmail(email);
    return response;
  }
);

export const registerAccount = createAsyncThunk(
  "user/registerAccount",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await postRegisterUser(data);
      await AsyncStorage.setItem(
        "@UserData",
        JSON.stringify(response.userData)
      );
      await AsyncStorage.setItem(
        "@TokenAccess",
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
  "company/getAllCompanies",
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
export const createNewCompany = createAsyncThunk(
  "company/createNewCompany",
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

export const updateDataUser = createAsyncThunk(
  "user/updateDataUser",
  async (response) => {
    return response;
  }
);
