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

const RenderItems = ({
  data,
  idCompany,
  errorSearch,
  styleText,
  unalterableItems,
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={principalColor} />
      </View>
    );
  } else if (errorSearch) {
    return (
      <View style={styles.centeredView}>
        <AntDesign name="closesquareo" size={30} color={errorColor} />
        <Text style={[styles.notFound, styleText]}>No encontrado</Text>
      </View>
    );
  } else if (unalterableItems.length === 0) {
    return (
      <View style={styles.centeredView}>
        <Text style={[styles.notItems, styleText]}>No hay items por ahora</Text>
      </View>
    );
  } else {
    return (
      <VirtualizedList
        data={data}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <SimplifiedItem item={item} idCompany={idCompany} />
        )}
        keyExtractor={(item) => item.id}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        showsVerticalScrollIndicator={false}
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
