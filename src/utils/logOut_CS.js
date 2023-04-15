import { action_CloseSession } from '../redux/actions';
import { deleteDataUser, deleteUserToken } from '../redux/userSlice';
import { LS_TOKENACCESS, LS_USERDATA, lsRemoveItems } from './localStorage';

const logOut_CS = (dispatch, idUser) => {
  dispatch(action_CloseSession({ idUser }));
  lsRemoveItems(LS_TOKENACCESS);
  lsRemoveItems(LS_USERDATA);
  dispatch(deleteUserToken());
  dispatch(deleteDataUser());
};

export default logOut_CS;
