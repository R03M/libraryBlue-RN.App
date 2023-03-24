import React from "react";
import { TouchableOpacity, Text } from "react-native";

const BtnCustom = ({ title, onPress, backgroundColor, textColor }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: backgroundColor,
        margin: 2,
      }}
      onPress={onPress}
    >
      <Text style={{ color: textColor, fontWeight: "bold" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BtnCustom;
