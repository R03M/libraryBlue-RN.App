import React, { useState } from 'react';
import { Alert, Image, Modal, Text, TextInput } from 'react-native';
import { View, StyleSheet } from 'react-native';
import AddImage from './AddImage';
import handlerValue from '../utils/handlerValue';
import naImg from '../utils/naImg';
import BtnCustom from './BtnCustom';
import { isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import { action_UpdateProfile } from '../redux/actions';

const EditProfile = ({ profile, modalEditProfile, setModalEditProfile }) => {
  const dispatch = useDispatch();

  const INITIAL_STATE_PROFILE = {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    image: profile.image,
  };

  const [updateProfile, setUpdateProfile] = useState(INITIAL_STATE_PROFILE);

  const handleSave = () => {
    if (isEqual(updateProfile, INITIAL_STATE_PROFILE)) {
      Alert.alert(null, 'No se detectaron cambios no se actualizará.', [], {
        cancelable: true,
      });
      return;
    }
    dispatch(action_UpdateProfile({ updateProfile }));
    setModalEditProfile(!modalEditProfile);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalEditProfile}
      onRequestClose={() => setModalEditProfile(!modalEditProfile)}>
      <View style={styles.centered}>
        <View style={styles.cardEdit}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Editar Perfil
          </Text>
          <View>
            <View
              style={{
                height: 200,
                width: '100%',
                borderRadius: 6,
                overflow: 'hidden',
              }}>
              <Image
                source={{
                  uri: updateProfile.image ? updateProfile.image : naImg,
                }}
                style={{
                  flex: 1,
                  resizeMode: 'stretch',
                }}
              />
            </View>
            <View style={styles.rowsBetween}>
              <Text>Nombre</Text>
              <TextInput
                style={styles.textInput}
                value={updateProfile.firstName}
                onChangeText={(value) =>
                  handlerValue(setUpdateProfile, 'firstName', value)
                }
              />
            </View>
            <View style={styles.rowsBetween}>
              <Text>Apellido</Text>
              <TextInput
                style={styles.textInput}
                value={updateProfile.lastName}
                onChangeText={(value) =>
                  handlerValue(setUpdateProfile, 'lastName', value)
                }
              />
            </View>
            <View style={styles.rowsBetween}>
              <Text>Imagen</Text>
              <AddImage
                onChangeImage={(value) =>
                  handlerValue(setUpdateProfile, 'image', value)
                }
                value={updateProfile.image}
              />
            </View>
            <View style={styles.rowsBetween}>
              <BtnCustom
                title="Cancelar"
                backgroundColor={'red'}
                textColor={'white'}
                onPress={() => {
                  setModalEditProfile(!modalEditProfile);
                }}
              />
              <BtnCustom
                title="Guardar"
                backgroundColor={'green'}
                textColor={'white'}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  cardEdit: {
    backgroundColor: 'white',
    margin: '4%',
    padding: '4%',
    borderRadius: 8,
    borderColor: '#5998c0',
    borderWidth: 1,
  },
  rowsBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '70%',
  },
});

export default EditProfile;
