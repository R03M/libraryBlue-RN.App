import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteDataUser,
  deleteUserToken,
  setErrorCheck,
  setUser,
  setUserToken,
} from '../redux/userSlice';
import { LS_TOKENACCESS, LS_USERDATA, lsGetItems } from '../utils/localStorage';
import { validateUser } from '../services/user';
import logOut_CS from '../utils/logOut_CS';

const useUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataUser = async () => {
      const token = await lsGetItems(LS_TOKENACCESS);
      const user = await lsGetItems(LS_USERDATA);

      if (!user && !token) {
        dispatch(deleteUserToken());
        dispatch(deleteDataUser());
        return;
      }

      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        image: user.image,
        position: user.position,
        status: user.status,
        accountCreation: user.accountCreation,
        authId: user.authId,
        companyId: user.companyId,
      };

      try {
        const response = await validateUser(userData, token);
        if (response.status === 200) {
          dispatch(setUser(user));
          dispatch(setUserToken(token));
        }
      } catch (error) {
        if (error.message === 'SERVER OFFLINE') {
          dispatch(
            setErrorCheck({
              errorMessage: error.message,
            })
          );
        }
        if (error.response.status === 406 || error.response.status === 401) {
          dispatch(
            setErrorCheck({
              errorMessage: error.response.data.message,
            })
          );
        }
        setTimeout(() => {
          logOut_CS(dispatch, user.id);
        }, 3000);
      }
    };
    getDataUser();
  }, []);
};

export default useUserData;
