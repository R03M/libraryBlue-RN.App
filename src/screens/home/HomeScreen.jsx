import React, { useState } from "react";
import { View, Button } from "react-native";
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../register/RegisterScreen";
import styles from "./homeS.Styles";

const HomeScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(null);

  const renderInitialButtons = () => {
    return currentScreen === null ? (
      <View style={styles.btns}>
        <Button
          title="Iniciar sesión"
          onPress={() => setCurrentScreen("login")}
        />
        <Button
          title="Registrarse"
          onPress={() => setCurrentScreen("register")}
        />
      </View>
    ) : null;
  };

  const renderSelectedScreen = () => {
    return currentScreen !== null ? (
      <View style={{ flexGrow: 1, justifyContent: "center" }}>
        {currentScreen === "login" ? <LoginScreen /> : <RegisterScreen />}
        <Button title="Go Back Home" onPress={() => setCurrentScreen(null)} />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      {renderInitialButtons()}
      {renderSelectedScreen()}
    </View>
  );
};

export default HomeScreen;
