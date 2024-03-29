import React, { useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TextInput } from 'react-native';
import { View, StyleSheet } from 'react-native';
import AddImage from './AddImage';
import handlerValue from '../utils/handlerValue';
import naImg from '../utils/naImg';
import BtnCustom from './BtnCustom';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { action_UpdateProfile } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { pHTCGlobal } from '../styles/global';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isDarkTheme = useTheme();
  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;
  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const { dataUser, token } = useSelector((state) => state.user);

  const INITIAL_STATE_PROFILE = {
    id: dataUser.id,
    firstName: dataUser.firstName,
    lastName: dataUser.lastName,
    image: dataUser.image,
  };

  const [updateProfile, setUpdateProfile] = useState(INITIAL_STATE_PROFILE);

  const handleSave = () => {
    if (isEqual(updateProfile, INITIAL_STATE_PROFILE)) {
      Alert.alert(null, 'No se detectaron cambios no se actualizará.', [], {
        cancelable: true,
      });
      return;
    }
    dispatch(action_UpdateProfile({ updateProfile, token }));
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={[styles.cardEdit, background]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: updateProfile.image ? updateProfile.image : naImg,
              }}
              style={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          </View>
        </View>
        <View style={styles.rowsBetween}>
          <Text style={textStyle}>Nombre</Text>
          <TextInput
            style={[styles.textInput, textStyle]}
            value={updateProfile.firstName}
            onChangeText={(value) =>
              handlerValue(setUpdateProfile, 'firstName', value)
            }
            placeholderTextColor={pHTCGlobal}
          />
        </View>
        <View style={styles.rowsBetween}>
          <Text style={textStyle}>Apellido</Text>
          <TextInput
            style={[styles.textInput, textStyle]}
            value={updateProfile.lastName}
            onChangeText={(value) =>
              handlerValue(setUpdateProfile, 'lastName', value)
            }
            placeholderTextColor={pHTCGlobal}
          />
        </View>
        <View style={styles.rowsBetween}>
          <Text style={textStyle}>Imagen</Text>
          <View style={{ width: '70%' }}>
            <AddImage
              onChangeImage={(value) =>
                handlerValue(setUpdateProfile, 'image', value)
              }
              value={updateProfile.image}
            />
          </View>
        </View>
        <BtnCustom
          title="Guardar"
          backgroundColor={'green'}
          textColor={'white'}
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardEdit: {
    flex: 1,
    padding: '4%',
    justifyContent: 'space-between',
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
