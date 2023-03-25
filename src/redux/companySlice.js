import { createSlice } from "@reduxjs/toolkit";
import { createNewCompany, getAllCompanies } from "./actions";

const initialState = {
  
  //? get Company
  companies: [],
  getCompaniesStatus: "idle",
  getCompaniesError: null,

  //? Create New Company
  createCompanyStatus: "idle",
  createCompanyError: null,
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

      //? get Company

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
      })

      //? Create New Company

      .addCase(createNewCompany.pending, (state) => {
        state.createCompanyStatus = "loading";
      })
      .addCase(
        createNewCompany.fulfilled,
        (state, { payload: { allCompanies } }) => {
          state.createCompanyStatus = "succeeded";
          state.companies = allCompanies;
        }
      )
      .addCase(createNewCompany.rejected, (state, action) => {
        state.createCompanyStatus = "failed";
        state.createCompanyError = action.payload;
      });
  },
});

export const { cleanErrorCompanies, cleanStatusCompanies } =
  companySlice.actions;

export default companySlice.reducer;
