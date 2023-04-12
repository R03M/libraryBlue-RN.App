import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import AddImage from './AddImage';
import { useDispatch, useSelector } from 'react-redux';
import handlerValue from '../utils/handlerValue';
import BtnCustom from './BtnCustom';
import { action_UpdateCompany } from '../redux/actions';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { principalColor } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import noBlankSpaces from '../utils/noBlankSpaces';

const UpdateCompany = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();

  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const { dataUser, token } = useSelector((state) => state.user);

  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;
  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const INITIAL_STATE_COMPANY = {
    id: dataUser.company.id,
    image: dataUser.company.image,
    code: dataUser.company.code,
  };

  const [update, setUpdate] = useState(INITIAL_STATE_COMPANY);

  const handleCode = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setUpdate, 'code', valueNoSpaces);
  };

  const handleSave = () => {
    dispatch(action_UpdateCompany({ dataCompany: update, token }));
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={[styles.card, background]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, textStyle]}>{dataUser.company.name}</Text>
        <View style={styles.viewImg}>
          <Image source={{ uri: update.image }} style={styles.img} />
        </View>

        <View style={styles.rows}>
          <Text style={textStyle}>Imagen</Text>
          <AddImage
            onChangeImage={(value) => handlerValue(setUpdate, 'image', value)}
            value={update.image}
          />
        </View>

        <View style={styles.rows}>
          <Text style={textStyle}>Código</Text>
          <TextInput
            style={[styles.textInput, styleText]}
            onChangeText={handleCode}
            value={update.code}
          />
        </View>
      </ScrollView>

      <View style={{ marginTop: 10 }}>
        <BtnCustom
          title={'GUARDAR'}
          backgroundColor={'green'}
          onPress={handleSave}
        />
      </View>
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
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  viewImg: {
    height: 200,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  img: {
    flex: 1,
    resizeMode: 'stretch',
  },
  textInput: {
    borderBottomColor: principalColor,
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '70%',
  },
});

export default UpdateCompany;
