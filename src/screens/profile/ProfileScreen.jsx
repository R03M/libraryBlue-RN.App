import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import { deleteDataUser, deleteUserToken } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "./profile.Styles";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.dataUser);

  const closeSession = async () => {
    try {
      await AsyncStorage.removeItem("@TokenAccess");
      await AsyncStorage.removeItem("@UserData");
      dispatch(deleteUserToken());
      dispatch(deleteDataUser());
      Alert.alert(null, "Sesión cerrada", [], {
        cancelable: true,
      });
      navigation.navigate("Login");
    } catch (error) {
      console.log(console.error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          margin: 20,
          backgroundColor: "#5998c0",
          padding: 20,
          borderRadius: 4,
        }}
      >
        <Text>{user.image}</Text>
        <Text>{user.fullName}</Text>
        <Text>{user.auth.email}</Text>
        <Text>{user.accountCreation}</Text>
      </View>
      <View
        style={{
          margin: 20,
          backgroundColor: "#5982c9",
          padding: 20,
          borderRadius: 4,
        }}
      >
        <Text>Your Company</Text>
        {user.company ? (
          <>
            <Text>{user.company.name}</Text>
            <Text>Position : {user.position}</Text>
            <Text>{user.company.image}</Text>
          </>
        ) : null}
        <Button title="Cerrar Sesion" onPress={closeSession} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
