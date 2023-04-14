import React, { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SimplifiedItem from './SimplifiedItem';
import { useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { errorColor, principalColor } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';

const ItemsList = ({ data, idCompany }) => {
  const { errorSearch, unalterableItems } = useSelector((state) => state.item);
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const RenderItems = () => {
    if (errorSearch) {
      return (
        <View style={styles.centeredView}>
          <AntDesign name="closesquareo" size={30} color={errorColor} />
          <Text style={[styles.notFound, styleText]}>No encontrado</Text>
        </View>
      );
    }
    if (data.length < 1) {
      return (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={principalColor} />
        </View>
      );
    }
    if (unalterableItems.length < 1) {
      return (
        <View style={styles.centeredView}>
          <Text style={[styles.notItems, styleText]}>
            No hay items por ahora
          </Text>
        </View>
      );
    }
    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SimplifiedItem item={item} idCompany={idCompany} />
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={5}
        />
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <RenderItems />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notItems: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default memo(ItemsList);
