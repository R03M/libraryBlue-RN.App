import AsyncStorage from '@react-native-async-storage/async-storage';

export const lsSetItems = async (item, payload) => {
  await AsyncStorage.setItem(item, JSON.stringify(payload));
};

export const lsGetItems = async (item) => {
  const itemString = await AsyncStorage.getItem(item);
  const response = JSON.parse(itemString);
  return response;
};

export const lsRemoveItems = async (item) => {
  await AsyncStorage.removeItem(item);
};
