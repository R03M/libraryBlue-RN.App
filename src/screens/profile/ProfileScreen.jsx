import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { deleteDataUser, deleteUserToken } from "../../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BtnCustom from "../../components/BtnCustom";
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

  const editProfile = () => {};

  const deactivateAccount = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.cardOne, { backgroundColor: "#5998c0" }]}>
        <Text style={styles.title}>{user.fullName}</Text>
        <Image source={{ uri: user.image }} style={styles.img} />
        <View style={{ margin: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Cuenta</Text>
            <Text>{user.position}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Inicio</Text>
            <Text>{user.accountCreation}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Email</Text>
            <Text>{user.auth.email}</Text>
          </View>
        </View>
        <View style={{ marginBottom: -5, alignItems: "flex-end" }}>
          <BtnCustom
            title={<AntDesign name="edit" size={20} />}
            backgroundColor={"black"}
            onPress={editProfile}
            textColor={"white"}
          />
        </View>
      </View>
      {user.company ? (
        <View style={[styles.cardOne, { backgroundColor: "#bfbfbf" }]}>
          <Text style={styles.title}>Company</Text>
          <Image source={{ uri: user.company.image }} style={styles.img} />
          <View style={{ margin: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Nombre</Text>
              <Text>{user.company.name}</Text>
            </View>
          </View>
          <View style={{ marginBottom: -5, alignItems: "flex-end" }}>
            <BtnCustom
              title={<MaterialIcons name="admin-panel-settings" size={20} />}
              backgroundColor={"black"}
              onPress={editProfile}
              textColor={"white"}
            />
          </View>
        </View>
      ) : null}
      <View style={styles.btnsView}>
        <Button
          title="Desactivar Cuenta"
          onPress={deactivateAccount}
          color={"#F44336"}
        />
        <Button
          title="Cerrar Sesion"
          onPress={closeSession}
          color={"#F44336"}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
