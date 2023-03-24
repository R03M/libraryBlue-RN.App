import React, { useEffect, useState } from "react";
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
    if (typeof companies !== "string") {
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
    }
  };

  const validateCode = (value) => {
    if (typeof companies !== "string") {
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
        Alert.alert("Error", "Primero escribe en nombre de la compañia", [], {
          cancelable: true,
        });
        handlerValue(setAssociatedCompany, "code", "");
      }
    }
  };

  useEffect(() => {
    if (thereIsCompany === 200 && isCode === 200) {
      const company = companies.find((e) => e.name === associatedCompany.name);
      const codeIsTrue = company.code === associatedCompany.code;
      if (company && codeIsTrue) {
        const associate = () => {
          associateCompany(associatedCompany.name);
        };
        associate();
      }
    }
  }, [associatedCompany]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        compañia asociada
      </Text>

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

      <Text style={{ fontStyle: "italic" }}>
        La compañia asociada es opcional y se puede agregar y/o cambiar luego.
      </Text>
    </View>
  );
};

export default SelectCompany;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 4,
    marginVertical: 10,
    backgroundColor: "#ff9e80",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
