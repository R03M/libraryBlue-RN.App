import { createSlice } from "@reduxjs/toolkit";
import { checkEmail, loginAccount } from "./actions";

const initialState = {
  dataUser: [],
  token: "n/a",
  responseCheckEmail: [],
  statusCheckMail: "idle",
  errorCheckMail: null,
  statusLogin: "idle",
  errorLogin: null,
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
  },
  extraReducers: (builder) => {
    builder

      //? checkEmail

      .addCase(checkEmail.pending, (state) => {
        state.statusCheckMail = "loading";
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.statusCheckMail = "succeeded";
        state.responseCheckEmail = action.payload;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.statusCheckMail = "failed";
        state.errorCheckMail = action.payload;
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
} = userSlice.actions;

export default userSlice.reducer;
