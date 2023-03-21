import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BtnCustom from "../../components/BtnCustom";
import * as ImagePicker from "expo-image-picker";
import { positionInf } from "../../utils/positionInf";
import { uploadImage } from "../../utils/cloudinary";
import { checkEmailToRegister } from "../../redux/actions";
import { validateEmail } from "../../utils/validateEmail";
import { cleanResponseEmailToRegister } from "../../redux/userSlice";
import { validatePassword } from "../../utils/password";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "./registerS.Styles";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [screen, setScreen] = useState("auth");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [picCloudinary, setPicCloudinary] = useState(null);

  const infEmail = useSelector(
    (state) => state.user.responseCheckEmailToRegister.infocheck
  );

  const [auth, setAuth] = useState({
    email: "",
    password: "",
    isGoogle: false,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    image: null,
    position: null,
    status: "Active",
  });

  const nextScreen = () => {
    const isValid =
      auth.email && auth.password && !errorEmail && !errorPassword;
    return isValid
      ? setScreen("userData")
      : Alert.alert(
          "Error",
          "Se requiere correo electronico y contraseña validos para continuar.",
          [],
          {
            cancelable: true,
          }
        );
  };

  /**
   * Actualiza el estado de una variable con una propiedad dinámica
   * @param {React.Dispatch<React.SetStateAction<{[key: string]: any}>>} set La función para actualizar el estado de la variable
   * @param {string} type El nombre de la propiedad dinámica
   * @param {any} value El nuevo valor de la propiedad
   * @returns {void}
   */
  const handlerValue = (set, type, value) => {
    set((prevAuth) => ({ ...prevAuth, [type]: value }));
    dispatch(cleanResponseEmailToRegister());
  };

  const register = () => {
    // console.log({ ...auth, ...userData });
  };

  const ShowPassW = () => {
    return (
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <Entypo
            name="eye-with-line"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        ) : (
          <Entypo
            name="eye"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const IconsStatus = () => {
    if (infEmail !== undefined) {
      if (!infEmail.email) {
        return (
          <AntDesign
            name="checkcircle"
            size={20}
            color="green"
            style={{ marginLeft: 10 }}
          />
        );
      } else {
        return (
          <AntDesign
            name="closecircleo"
            size={20}
            color="red"
            style={{ marginLeft: 10 }}
          />
        );
      }
    }
  };
  const descriptionTypeAccound = () => {
    if (userData.position === "Observant") {
      return (
        <Text style={styles.descripPosition}>{positionInf.Observant}</Text>
      );
    }
    if (userData.position === "Manager") {
      return <Text style={styles.descripPosition}>{positionInf.Manager}</Text>;
    }
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.canceled) {
        const response = await uploadImage(result.assets[0].uri);
        handlerValue(setUserData, "image", response);
        setPicCloudinary(true);
      }
    }
  };
  const emailValidation = () => {
    const errorValidate = validateEmail(auth.email);
    !errorValidate
      ? (dispatch(checkEmailToRegister(auth.email)), setErrorEmail(null))
      : setErrorEmail(errorValidate);
  };

  const passwordValidation = (value) => {
    const passwordValidate = validatePassword(value);
    !passwordValidate
      ? setErrorPassword(null)
      : setErrorPassword(passwordValidate);
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Registro</Text>
        <View style={styles.line}></View>
        {screen === "auth" ? (
          <View style={styles.userAuth}>
            <View style={styles.viewEmailandPass}>
              <TextInput
                style={[styles.textInputAuth, { width: "90%" }]}
                onChangeText={(value) => handlerValue(setAuth, "email", value)}
                value={auth.email}
                placeholder="Email"
                onBlur={emailValidation}
              />
              <IconsStatus />
            </View>

            {errorEmail ? (
              <Text style={{ color: "red", fontWeight: 700 }}>
                {errorEmail}
              </Text>
            ) : null}

            <View style={styles.viewEmailandPass}>
              <TextInput
                style={[styles.textInputAuth, { width: "90%" }]}
                onChangeText={(value) => {
                  setErrorPassword(null);
                  handlerValue(setAuth, "password", value);
                  passwordValidation(value);
                }}
                value={auth.password}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <ShowPassW />
            </View>
            {!errorPassword ? null : (
              <Text style={{ color: "red", fontWeight: 700 }}>
                {errorPassword}
              </Text>
            )}
            <View style={{ marginTop: 20 }}>
              <Button title="Continuar" onPress={nextScreen} />
            </View>
            {infEmail &&
              (infEmail.email ? (
                <View style={styles.viewError}>
                  <Text style={styles.textError}>
                    Ya existe una cuenta con ese correo electronico, si es tuya
                    puedes ingresar directamente en el apartado Login.
                  </Text>
                </View>
              ) : null)}
          </View>
        ) : (
          <View style={styles.userData}>
            <View style={styles.rows}>
              <Text>FirstName</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, "firstName", value)
                }
                value={userData.firstName}
                placeholder="jhon"
              />
            </View>
            <View style={styles.rows}>
              <Text>LastName</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, "lastName", value)
                }
                value={userData.lastName}
                placeholder="smith"
              />
            </View>

            <View style={styles.rows}>
              <Text>Select Image</Text>
              {userData.image && picCloudinary ? null : (
                <TextInput
                  style={[styles.textInput, { width: "30%" }]}
                  onChangeText={(value) => {
                    setPicCloudinary(false);
                    handlerValue(setUserData, "image", value);
                  }}
                  value={userData.image}
                  placeholder="https://image.jpg"
                />
              )}
              {userData.image && !picCloudinary ? null : (
                <BtnCustom
                  title={"Galeria"}
                  onPress={selectImage}
                  backgroundColor={"purple"}
                  textColor={"black"}
                />
              )}
              {userData.image ? (
                <BtnCustom
                  title={"🗑"}
                  onPress={() => {
                    setPicCloudinary(null);
                    handlerValue(setUserData, "image", null);
                  }}
                  backgroundColor={"red"}
                  textColor={"black"}
                />
              ) : null}
            </View>
            {!userData.image ? null : (
              <View style={styles.rows}>
                <Text>Image</Text>
                <Image
                  source={{ uri: userData.image }}
                  style={{ height: 80, width: 80 }}
                />
              </View>
            )}
            <View style={styles.rows}>
              <Text>Cuenta de </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "65%",
                }}
              >
                {userData.position === "Observant" ? null : (
                  <BtnCustom
                    title={"Coordinador"}
                    onPress={() =>
                      handlerValue(setUserData, "position", "Manager")
                    }
                    backgroundColor={"black"}
                    textColor={"white"}
                  />
                )}
                {userData.position === "Manager" ? null : (
                  <BtnCustom
                    title={"Cooperador"}
                    onPress={() =>
                      handlerValue(setUserData, "position", "Observant")
                    }
                    backgroundColor={"black"}
                    textColor={"white"}
                  />
                )}

                {userData.position ? (
                  <BtnCustom
                    title={"🗑"}
                    onPress={() => handlerValue(setUserData, "position", null)}
                    backgroundColor={"red"}
                    textColor={"black"}
                  />
                ) : null}
              </View>
            </View>
            {descriptionTypeAccound()}
            <View style={styles.rows}>
              <BtnCustom
                title={"Go Back"}
                onPress={() => setScreen("auth")}
                backgroundColor={"#cca120"}
                textColor={"white"}
              />
              <BtnCustom
                title={"Registrar"}
                onPress={register}
                backgroundColor={"#4caf50"}
                textColor={"white"}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
