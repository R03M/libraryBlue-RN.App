import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BtnCustom from './BtnCustom';
import SelectItem from './SelectCategory';
import { categories } from '../utils/values.enum';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from './SearchBar';

const NavBar = ({ activeNewItem }) => {
  const [filterBy, setFilterBy] = useState('N/A');
  const [status, setStatus] = useState('idle');

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
          <View>
            <SelectItem
              items={categories}
              onValueChange={(value) => setFilterBy(value)}
            />
          </View>
          <BtnCustom
            title={'Crear item'}
            onPress={activeNewItem}
            backgroundColor={'black'}
            textColor={'white'}
            styles={{ borderWidth: 1 }}
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
