import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteDataUser,
  deleteUserToken,
  setErrorCheck,
  setUser,
  setUserToken,
} from '../redux/userSlice';
import {
  LS_TOKENACCESS,
  LS_USERDATA,
  lsGetItems,
  lsRemoveItems,
} from '../utils/localStorage';
import { validateUser } from '../services/user';

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
        if (error.response.status === 406) {
          dispatch(setErrorCheck());
          setTimeout(() => {
            lsRemoveItems(LS_TOKENACCESS);
            lsRemoveItems(LS_USERDATA);
            dispatch(deleteUserToken());
            dispatch(deleteDataUser());
          }, 3000);
        }
      }
    };
    getDataUser();
  }, []);
};

export default useUserData;
