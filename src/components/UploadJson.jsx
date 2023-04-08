import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import BtnCustom from './BtnCustom';
import ModalExampleJSON from './ModalExampleJSON';
import { useDispatch, useSelector } from 'react-redux';
import { action_CreateManyItems } from '../redux/actions';

const UploadJson = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState('');
  const [modalExample, setModalExample] = useState(false);
  const { token, dataUser } = useSelector((state) => state.user);

  const handleCreate = () => {
    dispatch(
      action_CreateManyItems({
        idCompany: dataUser.company.id,
        data: JSON.parse(items),
        token,
      })
    );
  };

  return (
    <View style={styles.container}>
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
          <Text>
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
          style={{
            marginTop: 20,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          multiline={true}
          numberOfLines={8}
          value={items}
          onChangeText={setItems}
          placeholder="pega aqui el JSON"
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
    marginTop: 10,
  },
});

export default UploadJson;
