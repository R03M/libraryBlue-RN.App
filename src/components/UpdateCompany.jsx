import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import AddImage from './AddImage';
import { useDispatch, useSelector } from 'react-redux';
import handlerValue from '../utils/handlerValue';
import BtnCustom from './BtnCustom';
import { action_UpdateCompany } from '../redux/actions';

const UpdateCompany = () => {
  const dispatch = useDispatch();
  const { dataUser, token } = useSelector((state) => state.user);

  const INITIAL_STATE_COMPANY = {
    id: dataUser.company.id,
    image: dataUser.company.image,
  };

  const [update, setUpdate] = useState(INITIAL_STATE_COMPANY);

  const handleSave = () => {
    dispatch(action_UpdateCompany({ dataCompany: update, token }));
  };

  return (
    <View style={styles.card}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {dataUser.company.name}
        </Text>
        <View
          style={{
            height: 200,
            width: '100%',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
          <Image
            source={{
              uri: update.image,
            }}
            style={{
              flex: 1,
              resizeMode: 'stretch',
            }}
          />
        </View>

        <View style={styles.rows}>
          <Text>Imagen</Text>
          <AddImage
            onChangeImage={(value) => handlerValue(setUpdate, 'image', value)}
            value={update.image}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <BtnCustom
            title={'Guardar'}
            backgroundColor={'green'}
            onPress={handleSave}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: '4%',
    justifyContent: 'space-between',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  img: {
    height: 190,
    width: '100%',
    borderRadius: 120,
    justifyContent: 'center',
  },
});

export default UpdateCompany;
