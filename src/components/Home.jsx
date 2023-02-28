import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import styles from "../styles/home.Styles";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
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
    if (currentScreen !== null) {
      return (
        <View>
          {currentScreen === "login" ? <Login /> : <Register />}
          <Button
            title="Go Back"
            onPress={() => setCurrentScreen(null)}
            style={styles.goBackButton}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderInitialButtons()}
      {renderSelectedScreen()}
    </View>
  );
};

export default Home;
