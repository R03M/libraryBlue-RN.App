import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./items.Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemsScreen = () => {
  const mk = async () => {
    const token = await AsyncStorage.getItem("@TokenAccess");
    const userData = await AsyncStorage.getItem("@UserData");
    console.log(token, userData);
  };

  return (
    <View>
      <Button title="getDataLocal" onPress={mk} />
    </View>
  );
};

export default ItemsScreen;
