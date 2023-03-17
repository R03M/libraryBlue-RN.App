import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { deleteResponseEmail } from "../../redux/userSlice";
import { validateEmail } from "../../utils/validateEmail";
import { AntDesign } from "@expo/vector-icons";
import styles from "./loginS.Styles";
import { loginAccount, checkEmail } from "../../redux/actions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const infEmail = useSelector((state) => state.user.responseEmail.infocheck);
  const user = useSelector((state) => state.user.dataUser.userData);
  console.log(user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const IconsStatus = () => {
    if (infEmail !== undefined) {
      if (infEmail.email) {
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
            size={24}
            color="red"
            style={{ marginLeft: 10 }}
          />
        );
      }
    }
  };

  const handlerValidation = () => {
    const error = validateEmail(email);
    !error ? (dispatch(checkEmail(email)), setError(null)) : setError(error);
  };

  const handlerChange = (value) => {
    setEmail(value);
    const error = validateEmail(email);
    if (error) {
      dispatch(deleteResponseEmail());
    }
  };

  const logIn = () => {
    // if (!error) {
      dispatch(loginAccount({ email, password }));
    // }
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Iniciar Sesión</Text>
        <View style={styles.line}></View>
        <View style={styles.subContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={
                infEmail
                  ? [styles.textInput, { width: "90%" }]
                  : styles.textInput
              }
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) => handlerChange(value)}
              value={email}
              onBlur={handlerValidation}
            />
            <IconsStatus />
          </View>
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          ></View>

          <TextInput
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />

          <Button title="Iniciar sesión" onPress={logIn} />
        </View>
        {infEmail &&
          (!infEmail.email ? (
            <View
              style={{
                backgroundColor: "red",
                marginTop: 50,
                borderRadius: 4,
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
                El email {email} no existe
              </Text>
            </View>
          ) : null)}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
