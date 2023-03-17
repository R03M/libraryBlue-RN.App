import { createAsyncThunk } from "@reduxjs/toolkit";
import { postInfEmail } from "../services/register.js";
import { postLoginUser } from "../services/login.js";

export const checkEmail = createAsyncThunk("user/checkEmail", async (email) => {
  const response = await postInfEmail(email);
  return response;
});

export const loginAccount = createAsyncThunk(
  "user/loginAccount",
  async ({ email, password }) => {
    const response = await postLoginUser(email, password);
    return response;
  }
);
