import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { deleteResponseEmail } from "../../redux/userSlice";
import { validateEmail } from "../../utils/validateEmail";
import { AntDesign } from "@expo/vector-icons";
import { loginAccount, checkEmail } from "../../redux/actions";
import { Entypo } from "@expo/vector-icons";
import styles from "./loginS.Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const infEmail = useSelector((state) => state.user.responseEmail.infocheck);
  const { status, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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

  const handlerValidation = () => {
    const errorM = validateEmail(email);
    !errorM
      ? (dispatch(checkEmail(email)), setErrorEmail(null))
      : setErrorEmail(errorM);
  };

  const handlerChange = (value) => {
    setEmail(value);
    const error = validateEmail(email);
    if (error) {
      dispatch(deleteResponseEmail());
    }
  };

  const logIn = () => {
    if (errorEmail === null) {
      dispatch(loginAccount({ email, password }));
    }
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
          {errorEmail ? (
            <Text style={{ color: "red" }}>{errorEmail}</Text>
          ) : null}

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.textInput, { width: "90%" }]}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <ShowPassW />
          </View>

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
                No existe una cuenta con el email {email}
              </Text>
            </View>
          ) : null)}
        {status === "loading" && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        {error && <Text>{error.message}</Text>}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
