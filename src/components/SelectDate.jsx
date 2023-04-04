import { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import isEqual from 'lodash/isEqual';

const SelectDate = ({ handlerDate, value }) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [show, setShow] = useState(false);

  const showMode = () => {
    if (Platform.OS === 'android') {
      setShow(true);
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      handlerDate(selectedDate);
    }
  };

  const dateCurrent = format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          value={date}
          mode={'date'}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectDate;
