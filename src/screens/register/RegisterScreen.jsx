import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, ScrollView } from "react-native";
import BtnCustom from "../../components/BtnCustom";
import styles from "./registerS.Styles";
import { positionInf } from "../../utils/positionInf";

const RegisterScreen = () => {
  const [screen, setScreen] = useState("auth");
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    isGoogle: false,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    image: "",
    position: null,
    status: "Active",
  });

  const nextScreen = () => {
    // if (auth.email !== "" && auth.password !== "") {
    // } else {
    //   Alert.alert("Error", "Se requiere Email y Password para continuar");
    // }
    setScreen("userData");
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
  };

  const register = () => {
    console.log({ ...auth, ...userData });
  };

  const descriptionTypeAccound = () => {
    if (userData.position === "Observant") {
      return <Text style={styles.descripPosition}>{positionInf.Observant}</Text>;
    }
    if (userData.position === "Manager") {
      return <Text style={styles.descripPosition}>{positionInf.Manager}</Text>;
    }
  };

  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 18,
          borderRadius: 4,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Registro</Text>
        <View style={styles.line}></View>
        {screen === "auth" ? (
          <View style={styles.userData}>
            <TextInput
              style={styles.textInputAuth}
              onChangeText={(value) => handlerValue(setAuth, "email", value)}
              value={auth.email}
              placeholder="email"
            />
            <TextInput
              style={styles.textInputAuth}
              onChangeText={(value) => handlerValue(setAuth, "password", value)}
              value={auth.password}
              placeholder="password"
              secureTextEntry={true}
            />
            <View style={{ fontSize: 20, marginVertical: 20 }}>
              <Button title="Continuar" onPress={nextScreen} />
            </View>
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
              <Text>Image</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, "image", value)
                }
                value={userData.lastName}
                placeholder="image"
              />
            </View>
            <View style={styles.rows}>
              <Text>Cuenta de </Text>
              <View style={{ flexDirection: "row" }}>
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
            <View
              style={{
                position: "absolute",
                bottom: 10,
                width: "100%",
              }}
            >
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
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
