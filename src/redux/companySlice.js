import { createSlice } from "@reduxjs/toolkit";
import { getAllCompanies } from "./actions";

const initialState = {
  companies: [],
  getCompaniesStatus: "idle",
  getCompaniesError: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    cleanStatusCompanies: (state) => {
      state.getCompaniesStatus = "idle";
    },
    cleanErrorCompanies: (state) => {
      state.getCompaniesError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //? getCompany

      .addCase(getAllCompanies.pending, (state) => {
        state.getCompaniesStatus = "loading";
      })
      .addCase(
        getAllCompanies.fulfilled,
        (state, { payload: { allCompanies } }) => {
          state.getCompaniesStatus = "succeeded";
          state.companies = allCompanies;
        }
      )
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.getCompaniesStatus = "failed";
        state.getCompaniesError = action.payload;
      });
  },
});

export const { cleanErrorCompanies, cleanStatusCompanies } =
  companySlice.actions;

export default companySlice.reducer;
