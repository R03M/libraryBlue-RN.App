import { createSlice } from "@reduxjs/toolkit";
import {
  checkEmail,
  loginAccount,
  checkEmailToRegister,
  registerAccount,
  updateDataUser,
} from "./actions";

const initialState = {
  dataUser: [],
  token: "n/a",

  //? to login
  responseCheckEmail: [],
  statusCheckEmailToLogin: "idle",
  errorCheckEmailToLogin: null,

  //? login
  statusLogin: "idle",
  errorLogin: null,

  //? to register
  responseCheckEmailToRegister: [],
  statusCheckEmailRegister: "idle",
  errorCheckEmailRegister: null,
  statusCreateAccount: "idle",
  errorCreateAccount: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.dataUser = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    deleteDataUser: (state) => {
      state.dataUser = [];
    },
    deleteUserToken: (state) => {
      state.token = null;
    },
    cleanResponseEmail: (state) => {
      state.responseCheckEmail = [];
    },
    cleanStatusLogin: (state) => {
      state.statusLogin = "idle";
    },
    cleanErrorLogin: (state) => {
      state.errorLogin = null;
    },
    cleanResponseEmailToRegister: (state) => {
      state.responseCheckEmailToRegister = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //? checkEmailToLogin

      .addCase(checkEmail.pending, (state) => {
        state.statusCheckEmailToLogin = "loading";
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.statusCheckEmailToLogin = "succeeded";
        state.responseCheckEmail = action.payload;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.statusCheckEmailToLogin = "failed";
        state.errorCheckEmailToLogin = action.payload;
      })

      //? checkEmailToRegister

      .addCase(checkEmailToRegister.pending, (state) => {
        state.statusCheckEmailRegister = "loading";
      })
      .addCase(checkEmailToRegister.fulfilled, (state, action) => {
        state.statusCheckEmailRegister = "succeeded";
        state.responseCheckEmailToRegister = action.payload;
      })
      .addCase(checkEmailToRegister.rejected, (state, action) => {
        state.statusCheckEmailRegister = "failed";
        state.errorCheckEmailRegister = action.payload;
      })

      //? loginAccount

      .addCase(loginAccount.pending, (state) => {
        state.statusLogin = "loading";
      })
      .addCase(
        loginAccount.fulfilled,
        (state, { payload: { userData, token } }) => {
          state.statusLogin = "succeeded";
          state.dataUser = userData;
          state.token = token;
        }
      )
      .addCase(loginAccount.rejected, (state, action) => {
        state.statusLogin = "failed";
        state.errorLogin = action.payload;
      })

      //? registerAccount

      .addCase(registerAccount.pending, (state) => {
        state.statusCreateAccount = "loading";
      })
      .addCase(
        registerAccount.fulfilled,
        (state, { payload: { userData, token } }) => {
          state.statusCreateAccount = "succeeded";
          state.dataUser = userData;
          state.token = token;
        }
      )
      .addCase(registerAccount.rejected, (state, action) => {
        state.statusCreateAccount = "failed";
        state.errorCreateAccount = action.payload;
      })

      //? Update dataUser after Create Company

      .addCase(updateDataUser.pending, (state) => {
        state.statusLogin = "loading";
      })
      .addCase(
        updateDataUser.fulfilled,
        (state, { payload: { userData, token } }) => {
          state.statusLogin = "succeeded";
          state.dataUser = userData;
          state.token = token;
        }
      )
      .addCase(updateDataUser.rejected, (state, action) => {
        state.statusLogin = "failed";
        state.errorLogin = action.payload;
      });
  },
});

export const {
  setUser,
  setUserToken,
  deleteUserToken,
  deleteDataUser,
  cleanResponseEmail,
  cleanStatusLogin,
  cleanErrorLogin,
  cleanResponseEmailToRegister,
} = userSlice.actions;

export default userSlice.reducer;
