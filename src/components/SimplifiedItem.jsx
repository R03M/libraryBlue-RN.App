import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnCustom from './BtnCustom';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { naImg } from '../utils/naImg';
import { useDispatch, useSelector } from 'react-redux';
import { action_UpdateItem } from '../redux/actions';
import { isEqual } from 'lodash';
import { useNavigation } from '@react-navigation/native';

const SimplifiedItem = ({ item, idCompany }) => {
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const INITIAL_ITEM_STATE = {
    id: item.id,
    idCompany: idCompany,
    currentCount: '',
    exitOnly: true,
  };
  const [output, setOuput] = useState(false);
  const [updateItem, setUpdateItem] = useState(INITIAL_ITEM_STATE);
  const user = useSelector((state) => state.user.dataUser);

  const handleUpdateCurrentItem = () => {
    if (isEqual(INITIAL_ITEM_STATE, updateItem)) {
      Alert.alert('No hay cambios', `No se actualizará`, [], {
        cancelable: true,
      });
      return;
    }
    if (parseInt(updateItem.currentCount) > item.currentCount) {
      Alert.alert(
        null,
        `El valor de salida no puede ser mayor a ${item.currentCount}`,
        [],
        {
          cancelable: true,
        }
      );
      return;
    }
    dispatch(action_UpdateItem({ updateItem }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate('Detalle', {
            item,
          });
        }}>
        <View style={styles.card}>
          <Image
            source={{
              uri: item.image ? item.image : naImg,
            }}
            style={styles.img}
          />
          <View style={styles.textData}>
            <Text>{item.code}</Text>
            <Text>{item.title}</Text>
            <Text>{item.subtitle}</Text>
            <Text>{item.currentCount ? item.currentCount : 'N/A'}</Text>
            <Text>{item.category}</Text>
            <Text>{item.language}</Text>
            <Text>{item.edition}</Text>
            <Text>{item.letter}</Text>
          </View>
          {user.position !== 'Observant' && (
            <View style={{ alignItems: 'center' }}>
              {output ? (
                <View style={styles.output}>
                  <TextInput
                    style={styles.textInputNro}
                    onChangeText={(value) =>
                      setUpdateItem((prevItem) => ({
                        ...prevItem,
                        currentCount: value,
                      }))
                    }
                    value={updateItem.currentCount}
                    keyboardType="numeric"
                  />
                  <View style={{ margin: 2 }}>
                    <BtnCustom
                      title={<Entypo name="save" size={22} />}
                      onPress={handleUpdateCurrentItem}
                      textColor={'green'}
                    />
                  </View>
                  <View style={{ margin: 2 }}>
                    <BtnCustom
                      title={<MaterialIcons name="cancel" size={22} />}
                      onPress={() => {
                        setOuput(false);
                        setUpdateItem(null);
                      }}
                      textColor={'red'}
                    />
                  </View>
                </View>
              ) : (
                <BtnCustom
                  title={<MaterialCommunityIcons name="exit-run" size={24} />}
                  textColor={'#5998c0'}
                  onPress={() => setOuput(true)}
                />
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textData: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  textInputNro: {
    margin: 2,
    borderRadius: 2,
    borderWidth: 1,
    width: 40,
    textAlign: 'center',
    borderColor: '#5998c0',
  },
  img: {
    height: 110,
    width: '20%',
    borderRadius: 10,
    marginVertical: 10,
  },
  output: {
    marginVertical: 2,
    alignItems: 'stretch',
  },
});

export default SimplifiedItem;
