import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import SimplifiedItem from './SimplifiedItem';
import { errorColor, principalColor } from '../styles/global';
import { AntDesign } from '@expo/vector-icons';
import { memo } from 'react';

const Item = memo(({ item, idCompany }) => (
  <SimplifiedItem item={item} idCompany={idCompany} />
));

const RenderItems = ({
  data,
  idCompany,
  errorSearch,
  styleText,
  unalterableItems,
  statusGetItems,
}) => {
  const renderItem = ({ item }) => <Item item={item} idCompany={idCompany} />;
  if (errorSearch) {
    return (
      <View style={styles.centeredView}>
        <AntDesign name="closesquareo" size={30} color={errorColor} />
        <Text style={[styles.notFound, styleText]}>No encontrado</Text>
      </View>
    );
  }
  if (statusGetItems === 'loading') {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={principalColor} />
      </View>
    );
  } else if (unalterableItems.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text style={[styles.notItems, styleText]}>No hay items por ahora</Text>
      </View>
    );
  }
  if (data.length > 0) {
    return (
      <VirtualizedList
        data={data}
        initialNumToRender={10}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        showsVerticalScrollIndicator={false}
        // getItemLayout={(data, index) => ({
        //   length: 70, // altura de cada elemento
        //   offset: 70 * index, // posición del elemento en la lista
        //   index,
        // })}
      />
    );
  }
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

export default memo(RenderItems);
