import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Verificando información de sesión...</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Loading;
