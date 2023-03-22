import { createAsyncThunk } from "@reduxjs/toolkit";
import { postInfEmail } from "../services/register.js";
import { postLoginUser, postRegisterUser } from "../services/login.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCompanies } from "../services/company.js";

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
