import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteDataUser, deleteUserToken } from '../redux/userSlice';
import {
  LS_TOKENACCESS,
  LS_USERDATA,
  lsRemoveItems,
} from '../utils/localStorage';
import BtnCustom from './BtnCustom';
import { AntDesign } from '@expo/vector-icons';
import stylesGlobal, { errorColor, successColor } from '../styles/global';

const MenuUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params;

  const closeSession = async () => {
    Alert.alert(
      'Confimacion',
      '¿Desea cerrar sesion?',
      [
        {
          text: 'no',
        },
        {
          text: 'si',
          onPress: () => {
            lsRemoveItems(LS_TOKENACCESS);
            lsRemoveItems(LS_USERDATA);
            dispatch(deleteUserToken());
            dispatch(deleteDataUser());
            Alert.alert(null, 'Sesión cerrada', [], {
              cancelable: true,
            });
            navigation.navigate('Login');
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deleteAccount = () => {
    const msg = 'Eliminar tu cuenta es un cambio irreversible';
    Alert.alert(
      'Alerta',
      user.position !== 'Manager'
        ? msg
        : `${msg}, ademas al ser una cuenta de Administrador tambien se eliminará la compañia ${user.company.name} junto con todos los items, tus colaboradores serán desligados de la misma.`,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Continuar',
          onPress: () => {
            console.log('eliminado');
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="edit" size={30} color={successColor} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Editar mis datos</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={closeSession}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="logout" size={30} color={errorColor} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Cerrar Sesion</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={[
          stylesGlobal.line,
          {
            borderBottomColor: errorColor,
            marginTop: 30,
            marginHorizontal: 10,
          },
        ]}>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>Zona Peligrosa</Text>
      </View>
      <TouchableOpacity onPress={deleteAccount}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="delete" size={30} color="black" />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Eliminar Cuenta</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft: 10,
  },
});

export default MenuUser;
