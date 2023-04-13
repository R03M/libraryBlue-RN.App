import { deleteDataUser, deleteUserToken } from '../redux/userSlice';
import { LS_TOKENACCESS, LS_USERDATA, lsRemoveItems } from './localStorage';
import { postLogOut } from '../services/auth';

const logOut_CS = (dispatch, userId) => {
  postLogOut(userId);
  lsRemoveItems(LS_TOKENACCESS);
  lsRemoveItems(LS_USERDATA);
  dispatch(deleteUserToken());
  dispatch(deleteDataUser());
};

export default logOut_CS;
