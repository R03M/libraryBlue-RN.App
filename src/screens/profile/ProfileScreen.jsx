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

  const deactivateAccount = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.cardOne, { backgroundColor: "#5998c0" }]}>
        <Image source={{ uri: user.image }} style={styles.img} />
        <Text>{user.fullName}</Text>
        <Text>{user.auth.email}</Text>
        <Text>{user.accountCreation}</Text>
        <Text>Tipo de cuenta {user.position}</Text>
      </View>
      <View style={[styles.cardOne, { backgroundColor: "#bfbfbf" }]}>
        <Text>Your Company</Text>
        {user.company ? (
          <>
            <Text>{user.company.name}</Text>
            <Text>{user.company.image}</Text>
          </>
        ) : null}
      </View>
      <View style={styles.btnsView}>
        <Button title="Cerrar Sesion" onPress={closeSession} color={"red"} />
        <Button
          title="Desactivar Cuenta"
          onPress={deactivateAccount}
          color={"red"}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
