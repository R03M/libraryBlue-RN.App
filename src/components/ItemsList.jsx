import React, { memo } from 'react';
import { FlatList, Text, View } from 'react-native';
import SimplifiedItem from './SimplifiedItem';
import { useSelector } from 'react-redux';

const ItemsList = ({ data, idCompany }) => {
  const errorSearchItems = useSelector((state) => state.item.errorSearch);

  const RenderItems = () => {
    if (errorSearchItems) {
      return (
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          No encontrado
        </Text>
      );
    }
    if (data.length === 0) {
      return (
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 20,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          No hay items por ahora
        </Text>
      );
    } else {
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

export default memo(ItemsList);
