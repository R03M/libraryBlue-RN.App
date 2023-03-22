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
  Alert,
} from "react-native";
import {
  cleanErrorLogin,
  cleanResponseEmail,
  cleanStatusLogin,
} from "../../redux/userSlice";
import { validateEmail } from "../../utils/validateEmail";
import { loginAccount, checkEmail } from "../../redux/actions";
import { Entypo } from "@expo/vector-icons";
import IconStatusPositive from "../../components/IconStatusPositive";
import styles from "./loginS.Styles";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const infEmail = useSelector(
    (state) => state.user.responseCheckEmail.infocheck
  );
  const { statusLogin, errorLogin } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch(cleanResponseEmail());
    dispatch(cleanStatusLogin());
    dispatch(cleanErrorLogin());
    setEmail(value);
  };

  const handlerPassW = (value) => {
    dispatch(cleanErrorLogin());
    dispatch(cleanStatusLogin());
    setPassword(value);
  };

  const logIn = () => {
    if (errorEmail === null && email !== "" && password !== "") {
      dispatch(loginAccount({ email, password }));
    } else {
      Alert.alert(
        "Credenciales Requeridas",
        "Email y contraseña son requeridas para iniciar sesión.",
        [],
        {
          cancelable: true,
        }
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{}}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={styles.line}></View>
        <View style={styles.subContainer}>
          <View style={styles.viewEmailandPass}>
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
            <IconStatusPositive value={infEmail} />
          </View>
          {errorEmail ? (
            <Text style={{ color: "red" }}>{errorEmail}</Text>
          ) : null}

          <View style={styles.viewEmailandPass}>
            <TextInput
              style={[styles.textInput, { width: "90%" }]}
              onChangeText={(value) => handlerPassW(value)}
              value={password}
              placeholder="Password"
              secureTextEntry={!showPassword}
            />
            <ShowPassW />
          </View>
          <View style={{ marginTop: 30 }}>
            <Button title="Iniciar sesión" onPress={logIn} color={"#5998c0"} />
          </View>
        </View>
        {infEmail &&
          (!infEmail.email ? (
            <View style={styles.viewError}>
              <Text style={styles.textError}>
                No existe una cuenta con el email {email}
              </Text>
            </View>
          ) : null)}
        {statusLogin === "loading" && (
          <ActivityIndicator
            size="large"
            color="#2296f3"
            style={{ marginVertical: "10%" }}
          />
        )}
        {errorLogin === 401 && (
          <View style={styles.viewError}>
            <Text style={styles.textError}>Contraseña incorrecta</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
