import AsyncStorage from '@react-native-async-storage/async-storage';
// import { encryptedData, decryptData } from './crypto';

export const LS_ITEM = '@Items-lB';
export const LS_USERDATA = '@UserData-lB';
export const LS_TOKENACCESS = '@TokenAccess-lB';
export const LS_CONFIG = '@Settings-lB';

export const lsSetItems = async (item, payload) => {
  await AsyncStorage.setItem(item, JSON.stringify(payload));
};

export const lsGetItems = async (name) => {
  const itemStr = await AsyncStorage.getItem(name);
  const item = JSON.parse(itemStr);
  return item;
};

export const lsRemoveItems = async (item) => {
  await AsyncStorage.removeItem(item);
};
