import { createSlice } from '@reduxjs/toolkit';
import {
  checkEmail,
  loginAccount,
  checkEmailToRegister,
  registerAccount,
  action_UpdateProfile,
  updateDataCompany,
  newUserSelectCompany,
  action_ChangeTypeAccount,
  createNewCompany,
  action_DeleteCompany,
  action_DisconnectOfCompany,
  action_UpdateCompany,
} from './actions';
import { LS_USERDATA, lsSetItems } from '../utils/localStorage';

const initialState = {
  dataUser: [],
  token: 'n/a',

  //? to login
  responseCheckEmail: [],
  statusCheckEmailToLogin: 'idle',
  errorCheckEmailToLogin: null,

  //? login
  statusLogin: 'idle',
  errorLogin: null,

  //? to register
  responseCheckEmailToRegister: [],
  statusCheckEmailRegister: 'idle',
  errorCheckEmailRegister: null,
  statusCreateAccount: 'idle',
  errorCreateAccount: null,

  //? check dataUser
  errorResCheck: null,

  //? Create New Company
  statusCreateCompany: 'idle',
  errorCreateCompany: null,

  //? update profile
  statusUpdateProfile: 'idle',
  errorUpdateProfile: null,

  //? Select Company(New user[Observant])
  selectCompanyStatus: 'idle',
  selectCompanyError: null,

  //? Change Type Account
  statusChangeTypeAccount: 'idle',
  errorChangeTypeAccount: null,

  //? delete company
  statusDeleteCompany: 'idle',
  errorDeleteCompany: null,

  // ? disconnect of the company
  statusDiscOfCompany: 'idle',
  errorDiscOfCompany: null,

  // ? update company
  statusUpdateCompany: 'idle',
  errorUpdateCompany: null,
};

export const userSlice = createSlice({
  name: 'user',
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
      state.statusLogin = 'idle';
    },
    cleanErrorLogin: (state) => {
      state.errorLogin = null;
    },
    cleanResponseEmailToRegister: (state) => {
      state.responseCheckEmailToRegister = [];
    },
    setErrorCheck: (state) => {
      state.errorResCheck =
        'Credenciales caducadas, se requiere un nuevo ingreso de sesión.';
    },
  },
  extraReducers: (builder) => {
    builder

      //? checkEmailToLogin

      .addCase(checkEmail.pending, (state) => {
        state.statusCheckEmailToLogin = 'loading';
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.statusCheckEmailToLogin = 'succeeded';
        state.responseCheckEmail = action.payload;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.statusCheckEmailToLogin = 'failed';
        state.errorCheckEmailToLogin = action.payload;
      })

      //? checkEmailToRegister

      .addCase(checkEmailToRegister.pending, (state) => {
        state.statusCheckEmailRegister = 'loading';
      })
      .addCase(checkEmailToRegister.fulfilled, (state, action) => {
        state.statusCheckEmailRegister = 'succeeded';
        state.responseCheckEmailToRegister = action.payload;
      })
      .addCase(checkEmailToRegister.rejected, (state, action) => {
        state.statusCheckEmailRegister = 'failed';
        state.errorCheckEmailRegister = action.payload;
      })

      //? loginAccount

      .addCase(loginAccount.pending, (state) => {
        state.statusLogin = 'loading';
      })
      .addCase(
        loginAccount.fulfilled,
        (state, { payload: { userData, token } }) => {
          state.statusLogin = 'succeeded';
          state.dataUser = userData;
          state.token = token;
        }
      )
      .addCase(loginAccount.rejected, (state, action) => {
        state.statusLogin = 'failed';
        state.errorLogin = action.payload;
      })

      //? registerAccount

      .addCase(registerAccount.pending, (state) => {
        state.statusCreateAccount = 'loading';
      })
      .addCase(
        registerAccount.fulfilled,
        (state, { payload: { userData, token } }) => {
          state.statusCreateAccount = 'succeeded';
          state.dataUser = userData;
          state.token = token;
        }
      )
      .addCase(registerAccount.rejected, (state, action) => {
        state.statusCreateAccount = 'failed';
        state.errorCreateAccount = action.payload;
      })

      //? Create New Company

      .addCase(createNewCompany.pending, (state) => {
        state.statusCreateCompany = 'loading';
      })
      .addCase(
        createNewCompany.fulfilled,
        (state, { payload: { userData } }) => {
          state.statusCreateCompany = 'succeeded';
          state.dataUser = userData;
        }
      )
      .addCase(createNewCompany.rejected, (state, action) => {
        state.statusCreateCompany = 'failed';
        state.errorCreateCompany = action.payload;
      })

      //? Update userProfile

      .addCase(action_UpdateProfile.pending, (state) => {
        state.statusUpdateProfile = 'loading';
      })
      .addCase(
        action_UpdateProfile.fulfilled,
        (state, { payload: { userData } }) => {
          state.statusUpdateProfile = 'succeeded';
          state.dataUser = userData;
        }
      )
      .addCase(action_UpdateProfile.rejected, (state, action) => {
        state.statusUpdateProfile = 'failed';
        state.errorUpdateProfile = action.payload;
      })

      //? Update data company

      .addCase(action_UpdateCompany.pending, (state) => {
        state.statusUpdateCompany = 'loading';
      })
      .addCase(
        action_UpdateCompany.fulfilled,
        (state, { payload: { company } }) => {
          state.statusUpdateCompany = 'succeeded';
          state.dataUser.company = company;
          const userData = state.dataUser
          lsSetItems(LS_USERDATA, userData);
        }
      )
      .addCase(action_UpdateCompany.rejected, (state, action) => {
        state.statusUpdateCompany = 'failed';
        state.errorUpdateCompany = action.payload;
      })

      //? Select Company(New user[Observant])

      .addCase(newUserSelectCompany.pending, (state) => {
        state.selectCompanyStatus = 'loading';
      })
      .addCase(
        newUserSelectCompany.fulfilled,
        (state, { payload: { userData } }) => {
          state.selectCompanyStatus = 'succeeded';
          state.dataUser = userData;
        }
      )
      .addCase(newUserSelectCompany.rejected, (state, action) => {
        state.selectCompanyStatus = 'failed';
        state.selectCompanyError = action.payload;
      })

      //? Change Type Account

      .addCase(action_ChangeTypeAccount.pending, (state) => {
        state.statusChangeTypeAccount = 'loading';
      })
      .addCase(
        action_ChangeTypeAccount.fulfilled,
        (state, { payload: { userData } }) => {
          state.statusChangeTypeAccount = 'succeeded';
          state.dataUser = userData;
        }
      )
      .addCase(action_ChangeTypeAccount.rejected, (state, action) => {
        state.statusChangeTypeAccount = 'failed';
        state.errorChangeTypeAccount = action.payload;
      })

      // ? delete company

      .addCase(action_DeleteCompany.pending, (state) => {
        state.statusDeleteCompany = 'loading';
      })
      .addCase(action_DeleteCompany.fulfilled, (state) => {
        state.statusDeleteCompany = 'succeeded';
        state.dataUser.company = null;
        state.dataUser.companyId = null;
      })
      .addCase(action_DeleteCompany.rejected, (state, action) => {
        state.statusDeleteCompany = 'failed';
        state.errorDeleteCompany = action.payload;
      })

      // ? disconnect of the company

      .addCase(action_DisconnectOfCompany.pending, (state) => {
        state.statusDiscOfCompany = 'loading';
      })
      .addCase(action_DisconnectOfCompany.fulfilled, (state) => {
        state.statusDiscOfCompany = 'succeeded';
        state.dataUser.company = null;
        state.dataUser.companyId = null;
      })
      .addCase(action_DisconnectOfCompany.rejected, (state, action) => {
        state.statusDiscOfCompany = 'failed';
        state.errorDiscOfCompany = action.payload;
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
  setErrorCheck,
} = userSlice.actions;

export default userSlice.reducer;
