import { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import es from "date-fns/locale/es";

const SelectDate = ({ handlerDate }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showMode = () => {
    if (Platform.OS === "android") {
      setShow(true);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    handlerDate(currentDate);
  };

  const dateCurrent = format(date, "dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          onChange={onChange}
          locale="es-ES"
        />
      )}
      <Button title={dateCurrent} onPress={showMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SelectDate;
