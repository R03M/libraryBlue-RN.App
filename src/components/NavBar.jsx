import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BtnCustom from './BtnCustom';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('idle');
  const { dataUser } = useSelector((state) => state.user);

  const Show = () => {
    return (
      <BtnCustom
        title={
          <MaterialIcons
            name={
              status === 'idle' ? 'keyboard-arrow-down' : 'keyboard-arrow-up'
            }
            size={30}
          />
        }
        title0={status === 'idle' ? 'libraryBlue' : 'Busca algo...'}
        title2={
          status === 'idle' ? `Hola ${dataUser.firstName} !` : 'o crea un item'
        }
        onPress={
          status === 'idle'
            ? () => setStatus('active')
            : () => setStatus('idle')
        }
        styles={{ marginTop: 8, padding: 0, marginHorizontal: 8 }}
        backgroundColor={'#5998c0'}
        textColor={'white'}
      />
    );
  };
  return (
    <>
      {status === 'active' && (
        <View style={styles.container}>
          <SearchBar />
          <BtnCustom
            title={'CREAR'}
            onPress={() => navigation.navigate('Crear Item')}
            backgroundColor={'black'}
            textColor={'white'}
            styles={{ padding: 12, marginHorizontal: 8 }}
          />
        </View>
      )}
      <Show />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
});

export default NavBar;
