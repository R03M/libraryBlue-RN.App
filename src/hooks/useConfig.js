import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LS_CONFIG, lsGetItems } from '../utils/localStorage';
import { updateThemeReducer, updateUDSReducer } from '../redux/settingsSlice';

const useConfig = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSettings = async () => {
      const currentTheme = await lsGetItems(LS_CONFIG);
      if (currentTheme !== null) {
        dispatch(updateThemeReducer(currentTheme.theme));
        dispatch(updateUDSReducer(currentTheme.useDeviceSettings));
      }
    };
    getSettings();
  }, []);
};

export default useConfig;
