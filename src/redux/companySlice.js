import { createSlice } from '@reduxjs/toolkit';
import {
  action_getAllCompanyUsers,
  createNewCompany,
  getAllCompanies,
  newUserSelectCompany,
  action_UpdateCompany
} from './actions';

const initialState = {
  //? get Company
  companies: [],
  getCompaniesStatus: 'idle',
  getCompaniesError: null,

  //? Create New Company
  createCompanyStatus: 'idle',
  createCompanyError: null,

  //? Select Company(New user[Observant])
  selectCompanyStatus: 'idle',
  selectCompanyError: null,

  //? company users
  allUsers: [],
  statusGetAllUsers: 'idle',
  errorGetAllUsers: null,

  //? update company 
  statusUpdateCompany: 'idle',
  errorUpdateCompany: null,

};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    cleanStatusCompanies: (state) => {
      state.getCompaniesStatus = 'idle';
    },
    cleanErrorCompanies: (state) => {
      state.getCompaniesError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //? get Company

      .addCase(getAllCompanies.pending, (state) => {
        state.getCompaniesStatus = 'loading';
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.getCompaniesStatus = 'succeeded';
        state.companies = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.getCompaniesStatus = 'failed';
        state.getCompaniesError = action.payload;
      })

      //? Create New Company

      .addCase(createNewCompany.pending, (state) => {
        state.createCompanyStatus = 'loading';
      })
      .addCase(createNewCompany.fulfilled, (state, action) => {
        state.createCompanyStatus = 'succeeded';
        // state.companies = action.payload;
      })
      .addCase(createNewCompany.rejected, (state, action) => {
        state.createCompanyStatus = 'failed';
        state.createCompanyError = action.payload;
      })

      //? Select Company(New user[Observant])

      .addCase(newUserSelectCompany.pending, (state) => {
        state.selectCompanyStatus = 'loading';
      })
      .addCase(newUserSelectCompany.fulfilled, (state) => {
        state.selectCompanyStatus = 'succeeded';
      })
      .addCase(newUserSelectCompany.rejected, (state, action) => {
        state.selectCompanyStatus = 'failed';
        state.selectCompanyError = action.payload;
      })

      //? get all company users

      .addCase(action_getAllCompanyUsers.pending, (state) => {
        state.statusGetAllUsers = 'loading';
      })
      .addCase(action_getAllCompanyUsers.fulfilled, (state, action) => {
        state.statusGetAllUsers = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(action_getAllCompanyUsers.rejected, (state, action) => {
        state.statusGetAllUsers = 'failed';
        state.errorGetAllUsers = action.payload;
      })

      //? update company 

      .addCase(action_UpdateCompany.pending, (state) => {
        state.statusUpdateCompany = 'loading';
      })
      .addCase(action_UpdateCompany.fulfilled, (state, action) => {
        state.statusUpdateCompany = 'succeeded';
        // state.allUsers = action.payload;
      })
      .addCase(action_UpdateCompany.rejected, (state, action) => {
        state.statusUpdateCompany = 'failed';
        state.errorUpdateCompany = action.payload;
      });
  },
});

export const { cleanErrorCompanies, cleanStatusCompanies } =
  companySlice.actions;

export default companySlice.reducer;
