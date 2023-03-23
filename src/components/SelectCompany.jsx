import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Alert, Button } from "react-native";
import handlerValue from "../utils/handlerValue";
import IconStatus from "./IconStatus";

const SelectCompany = ({ companies, associateCompany }) => {
  const [thereIsCompany, setThereIsCompany] = useState("idle");
  const [isCode, setIsCode] = useState("idle");

  const [associatedCompany, setAssociatedCompany] = useState({
    name: "",
    code: "",
  });

  const validateCompany = (value) => {
    const thereIsCompany = companies.find((e) => e.name === value);

    if (thereIsCompany) {
      setThereIsCompany(200);
    }
    if (!thereIsCompany) {
      setThereIsCompany(404);
    }
    if (value === "") {
      setThereIsCompany("idle");
    }
  };

  const validateCode = (value) => {
    const company = companies.find((e) => e.name === associatedCompany.name);
    if (company) {
      const codeIsTrue = company.code === value;

      if (codeIsTrue) {
        setIsCode(200);
      }
      if (!codeIsTrue) {
        setIsCode(404);
      }
      if (value === "") {
        setIsCode("idle");
      }
    }
    if (associatedCompany.name === "") {
      Alert.alert(null, "Primero escribe en nombre de la compañia", [], {
        cancelable: true,
      });
      handlerValue(setAssociatedCompany, "code", "");
    }
  };

  const associate = () => {
    associateCompany(associatedCompany.name);
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>Compañia asociada</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Nombre</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            style={[styles.textInput, { width: "65%" }]}
            onChangeText={(value) => {
              handlerValue(setAssociatedCompany, "name", value);
              validateCompany(value);
            }}
            value={associatedCompany.name}
          />
          <IconStatus value={thereIsCompany} typePositive={true} />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Codigo</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            style={[styles.textInput, { width: "65%" }]}
            onChangeText={(value) => {
              handlerValue(setAssociatedCompany, "code", value);
              validateCode(value);
            }}
            value={associatedCompany.code}
          />
          <IconStatus value={isCode} typePositive={true} />
        </View>
      </View>
      {thereIsCompany === 404 && (
        <View style={{ backgroundColor: "red", padding: 4 }}>
          <Text style={{ color: "white" }}>
            La compañia {associatedCompany.name} no existe
          </Text>
        </View>
      )}
      <Button title="Asociar" onPress={associate} />
    </View>
  );
};

export default SelectCompany;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 4,
    marginVertical: 10,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
