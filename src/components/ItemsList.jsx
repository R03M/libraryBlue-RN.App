import React from 'react';
import { FlatList, Text, View } from 'react-native';
import SimplifiedItem from './SimplifiedItem';

const ItemsList = ({ data }) => {
  return (
    <View style={{ margin: 8, padding: 10 }}>
      {data.length === 0 ? (
        <Text>No hay items por ahora</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SimplifiedItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ItemsList;
