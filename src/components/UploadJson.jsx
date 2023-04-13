import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import BtnCustom from './BtnCustom';
import ModalExampleJSON from './ModalExampleJSON';
import { useDispatch, useSelector } from 'react-redux';
import { action_CreateManyItems } from '../redux/actions';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { pHTCGlobal } from '../styles/global';
import { useNavigation } from '@react-navigation/native';

const UploadJson = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();
  const [items, setItems] = useState('');
  const [modalExample, setModalExample] = useState(false);
  const { token, dataUser } = useSelector((state) => state.user);

  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;
  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const handleCreate = () => {
    dispatch(
      action_CreateManyItems({
        idCompany: dataUser.company.id,
        associatedCompany: dataUser.company?.associatedCompany,
        data: JSON.parse(items),
        token,
      })
    );
    navigation.goBack();
    navigation.navigate('ItemsScreen');
  };

  return (
    <View style={[styles.container, background]}>
      <ModalExampleJSON
        modalExample={modalExample}
        setModalExample={setModalExample}
      />
      <View
        style={{
          width: '90%',
          marginTop: 10,
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <View style={{ width: '60%' }}>
          <Text style={textStyle}>
            Puedes subir un archivo JSON con items, para crear muchos items en
            un momento.
          </Text>
        </View>
        <View style={{ width: '40%' }}>
          <BtnCustom
            title="Mostar Ejemplo"
            onPress={() => setModalExample(!modalExample)}
            backgroundColor={'#5998c0'}
            textColor={'white'}
          />
        </View>
      </View>
      <View style={{ flex: 1, width: '90%' }}>
        <TextInput
          style={[
            {
              marginTop: 20,
              borderColor: 'gray',
              borderWidth: 1,
            },
            textStyle,
          ]}
          multiline={true}
          numberOfLines={8}
          value={items}
          onChangeText={setItems}
          placeholder=" pega aqui el JSON"
          placeholderTextColor={pHTCGlobal}
        />
      </View>

      <View style={{ width: '85%', marginVertical: 20 }}>
        <BtnCustom
          title={'Crear'}
          backgroundColor={'#5998c0'}
          textColor={'white'}
          onPress={handleCreate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default UploadJson;
