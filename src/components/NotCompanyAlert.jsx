import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const NotCompanyAlert = ({ position, setModalVisible }) => {
  return position === "Manager" ? (
    <View style={styles.cardView}>
      <Text>
        Aun no creas una compañia, cuando lo hagas podras empezar a añadir
        items, editarlos y visualizarlos.
      </Text>
      <View style={styles.btn}>
        <Button title="crear compañia" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  ) : (
    <View style={styles.cardView}>
      <Text>
        Aun no seleccionas una compañia para colaborar, cuando lo hagas podras
        empezar a añadir items, editarlos y visualizarlos.
      </Text>
      <View style={styles.btn}>
        <Button
          title="unirse a una compañia"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 4,
    elevation: 4, // of Android
    shadowColor: "#000000", // of iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btn: {
    marginTop: 20,
  },
});

export default NotCompanyAlert;
