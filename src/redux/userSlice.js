import { createSlice } from "@reduxjs/toolkit";
import { checkEmail, loginAccount } from "./actions";

const initialState = {
  dataUser: [],
  token: null,
  responseEmail: [],
  status: "idle",
  error: [],
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
    deleteResponseEmail: (state) => {
      state.responseEmail = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //? checkEmail

      .addCase(checkEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseEmail = action.payload;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })

      //? loginAccount

      .addCase(loginAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginAccount.fulfilled,
        (state, { payload: { userData } }) => {
          state.status = "succeeded";
          state.dataUser = userData;
          // state.token = token;
        }
      )
      .addCase(loginAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, setUserToken, deleteResponseEmail } = userSlice.actions;

export default userSlice.reducer;
