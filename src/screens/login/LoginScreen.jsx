import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styles from "./loginS.Styles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = () => {};

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />

      <Button title="Iniciar sesión" onPress={logIn} />
    </View>
  );
};

export default LoginScreen;
