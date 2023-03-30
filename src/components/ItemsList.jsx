import React from 'react';
import { FlatList, Text, View } from 'react-native';
import SimplifiedItem from './SimplifiedItem';
import { useSelector } from 'react-redux';

const ItemsList = ({ data }) => {
  const errorSearchItems = useSelector((state) => state.item.errorSearch);

  const RenderItems = () => {
    if (errorSearchItems) {
      return <Text>No encontrado</Text>;
    }
    if (data.length === 0) {
      return <Text>No hay items por ahora</Text>;
    } else {
      return (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SimplifiedItem item={item} />}
          showsVerticalScrollIndicator={false}
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

export default ItemsList;
