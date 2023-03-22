import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, ScrollView, Alert, Image } from "react-native";
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
          elevation: 4, // para Android
          shadowColor: "#000000", // para iOS
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }}
      >
        <Image
          source={{ uri: user.image }}
          style={{
            height: 60,
            width: 60,
            borderRadius: 10,
            marginHorizontal: 10,
            marginTop: -10,
          }}
        />
        <Text>{user.fullName}</Text>
        <Text>{user.auth.email}</Text>
        <Text>{user.accountCreation}</Text>
        <Text>Tipo de cuenta {user.position}</Text>
      </View>
      <View
        style={{
          margin: 20,
          backgroundColor: "#5982c9",
          padding: 20,
          borderRadius: 4,
          elevation: 4, // para Android
          shadowColor: "#000000", // para iOS
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
        }}
      >
        <Text>Your Company</Text>
        {user.company ? (
          <>
            <Text>{user.company.name}</Text>
            <Text>{user.company.image}</Text>
          </>
        ) : null}
        <Button title="Cerrar Sesion" onPress={closeSession} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
