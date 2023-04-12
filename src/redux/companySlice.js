import { createSlice } from '@reduxjs/toolkit';
import {
  action_getAllCompanyUsers,
  getAllCompanies,
  action_UpdateCompany,
  action_UpdatePositionUser,
  action_RemoveUserOfCompany,
} from './actions';

const initialState = {
  //? get Company
  companies: [],
  getCompaniesStatus: 'idle',
  getCompaniesError: null,

  //? company users
  allUsers: [],
  statusGetAllUsers: 'idle',
  errorGetAllUsers: null,

  //? update company
  statusUpdateCompany: 'idle',
  errorUpdateCompany: null,

  //? update position user
  statusUpdatePositionUser: 'idle',
  errorUpdatePositionUser: null,

  //? remove user of company
  statusRemoveUserOfC: 'idle',
  errorRemoveUserOfC: null,
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
      })

      //? update position user

      .addCase(action_UpdatePositionUser.pending, (state) => {
        state.statusUpdatePositionUser = 'loading';
      })
      .addCase(action_UpdatePositionUser.fulfilled, (state, action) => {
        state.statusUpdatePositionUser = 'succeeded';
      })
      .addCase(action_UpdatePositionUser.rejected, (state, action) => {
        state.statusUpdatePositionUser = 'failed';
        state.errorUpdatePositionUser = action.payload;
      })

      //? remove user of company

      .addCase(action_RemoveUserOfCompany.pending, (state) => {
        state.statusRemoveUserOfC = 'loading';
      })
      .addCase(
        action_RemoveUserOfCompany.fulfilled,
        (state, { payload: { userDeleted } }) => {
          state.statusRemoveUserOfC = 'succeeded';
          state.allUsers.filter((user) => user.id !== userDeleted);
        }
      )
      .addCase(action_RemoveUserOfCompany.rejected, (state, action) => {
        state.statusRemoveUserOfC = 'failed';
        state.errorRemoveUserOfC = action.payload;
      });
  },
});

export const { cleanErrorCompanies, cleanStatusCompanies } =
  companySlice.actions;

export default companySlice.reducer;
