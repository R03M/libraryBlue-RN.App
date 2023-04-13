import { useDispatch } from 'react-redux';
import { deleteDataUser, deleteUserToken } from '../redux/userSlice';
import { LS_TOKENACCESS, LS_USERDATA, lsRemoveItems } from './localStorage';
import { postLogOut } from '../services/auth';

const logOut_CS = (userId) => {
  const dispatch = useDispatch();
  postLogOut(userId);
  lsRemoveItems(LS_TOKENACCESS);
  lsRemoveItems(LS_USERDATA);
  dispatch(deleteUserToken());
  dispatch(deleteDataUser());
};

export default logOut_CS;
