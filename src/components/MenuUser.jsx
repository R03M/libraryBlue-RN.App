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
import { AntDesign } from '@expo/vector-icons';
import stylesGlobal, { errorColor, successColor } from '../styles/global';
import { useTheme } from '../hooks/useTheme';

const MenuUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const isDarkTheme = useTheme();
  const { user } = route.params;
  
  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;
  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

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
    <View style={[background, styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="edit" size={30} color={successColor} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Editar mis datos</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={closeSession}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="logout" size={30} color={errorColor} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Cerrar Sesion</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={[stylesGlobal.line, styles.lineDangerZ]}>
        <Text style={[styles.titleDangeZ, textStyle]}>Zona Peligrosa</Text>
      </View>
      <TouchableOpacity onPress={deleteAccount}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="delete" size={30} color={'orange'} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Eliminar Cuenta</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft: 10,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  titleDangeZ: {
    fontSize: 16,
    fontWeight: 700,
  },
  icon: {
    paddingHorizontal: 10,
  },
  viewText: {
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  lineDangerZ: {
    borderBottomColor: errorColor,
    marginTop: 30,
    marginHorizontal: 10,
  },
});

export default MenuUser;
