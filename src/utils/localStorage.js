import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItems = async (item, payload) => {
  await AsyncStorage.setItem(item, JSON.stringify(payload));
};
export const getItems = async (item) => {
  await AsyncStorage.getItem(item);
};
export const removeItems = async (item, payload) => {
  await AsyncStorage.removeItem(item);
};
