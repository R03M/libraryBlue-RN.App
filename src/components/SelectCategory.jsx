import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const SelectItem = ({ items, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => handleValueChange(value)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label={"N/A"} value={"N/A"}/>
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: 170,
    height: 50,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default SelectItem;
