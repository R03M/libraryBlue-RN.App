import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { principalColor } from '../styles/global';
import BtnCustom from './BtnCustom';

const NotCompanyAlert = ({ position, setModalVisible }) => {
  return position === 'Manager' ? (
    <View style={styles.cardView}>
      <Text>
        Aún no creas una compañia, cuando lo hagas podras empezar a añadir
        items, editarlos y visualizarlos.
      </Text>
      <View style={styles.btn}>
        <BtnCustom
          title="CREAR COMPAÑIA"
          onPress={() => setModalVisible(true)}
          backgroundColor={principalColor}
          textColor={'#fff'}
        />
      </View>
    </View>
  ) : (
    <View style={styles.cardView}>
      <Text>
        Aun no seleccionas una compañia para colaborar, cuando lo hagas podras
        empezar a añadir items, editarlos y visualizarlos.
      </Text>
      <View style={styles.btn}>
        <BtnCustom
          title="UNIRSE A UNA COMPAÑIA"
          onPress={() => setModalVisible(true)}
          backgroundColor={principalColor}
          textColor={'#fff'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 4,
    elevation: 4, // of Android
    shadowColor: '#000000', // of iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btn: {
    marginTop: 20,
  },
});

export default NotCompanyAlert;
