import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import AddImage from './AddImage';
import { useDispatch, useSelector } from 'react-redux';
import handlerValue from '../utils/handlerValue';
import BtnCustom from './BtnCustom';
import SelectCompany from './SelectCompany';
import { getAllCompanies } from '../redux/actions';

const UpdateCompany = () => {
  const dispatch = useDispatch();
  const { dataUser, token } = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    const idCompany = dataUser.company.id;
    dispatch(getAllCompanies({ idCompany, token }));
  }, []);

  const INITIAL_STATE_COMPANY = {
    id: dataUser.company.id,
    name: dataUser.company.name,
    image: dataUser.company.image,
    associatedCompany: dataUser.company.associatedCompany,
    codeAssociated: dataUser.company.codeAssociated,
  };

  const [update, setUpdate] = useState(INITIAL_STATE_COMPANY);

  return (
    <View style={styles.card}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text>Nombre</Text>
            <TextInput
              onChange={(value) => handlerValue(setUpdate, 'name', value)}
              value={update.name}
            />
          </View>
          <View style={styles.rows}>
            <Text>Imagen</Text>
            <AddImage
              onChangeImage={(value) => handlerValue(setUpdate, 'image', value)}
              value={update.image}
            />
          </View>
          <SelectCompany
            companies={companies}
            myCompany={dataUser.company.name}
            associateCompany={(value) =>
              handlerValue(setUpdate, 'associatedCompany', value)
            }
          />
        </ScrollView>
      </View>

      <BtnCustom title={'Guardar'} backgroundColor={'green'} />
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
