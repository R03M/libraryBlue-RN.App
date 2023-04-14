import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import stylesGlobal, {
  errorColor,
  orangeColor,
  successColor,
} from '../styles/global';
import { useTheme } from '../hooks/useTheme';
import {
  action_ChangeTypeAccount,
  action_DeleteUser,
  action_DisconnectOfCompany,
} from '../redux/actions';
import logOut_CS from '../utils/logOut_CS';
import { postLogOut } from '../services/auth';
import { deleteUser } from '../services/user';

const MenuUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isDarkTheme = useTheme();

  const { dataUser, token } = useSelector((state) => state.user);

  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;
  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const handleDisconnectCompany = () => {
    if (dataUser.company !== null && dataUser.position !== 'Manager') {
      Alert.alert(
        'Confimacion',
        'Estas seguro de querer desvincularte de tu actual compañia.',
        [
          { text: 'cancelar' },
          {
            text: 'desvincular',
            onPress: () => {
              dispatch(
                action_DisconnectOfCompany({ idUser: dataUser.id, token })
              );
              navigation.goBack();
            },
          },
        ]
      );
      return;
    }
    Alert.alert(null, 'No estas vinculado a ninguna compañia.', [], {
      cancelable: true,
    });
  };

  const handleChangePosition = () => {
    const msgToManager =
      'al cambiar obtendras una cuenta tipo Cooperador y podras unirte a otra compañia bajo ese rol.';
    const msgToHelper =
      'al cambiar obtendras una cuenta tipo Coordinador y podras crear una compañia.';

    Alert.alert(
      'Confimacion',
      `¿Estas seguro de cambiar tu tipo de cuenta?\nActualmente tienes una cuenta tipo ${
        dataUser.position === 'Manager'
          ? `Coordinador, ${msgToManager}`
          : `Cooperador, ${msgToHelper}`
      }`,
      [
        {
          text: 'cancelar',
        },
        {
          text: 'cambiar',
          onPress: () => {
            const position =
              dataUser.position === 'Manager' ? 'Observant' : 'Manager';
            const id = dataUser.id;
            dispatch(
              action_ChangeTypeAccount({ data: { position, id }, token })
            );
            navigation.goBack();
          },
        },
      ]
    );
  };

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
            logOut_CS(dispatch, dataUser.id);
            Alert.alert(null, 'Sesión cerrada', [], {
              cancelable: true,
            });
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
    const msgWithCompany = `, ademas al ser una cuenta de Coordinador tambien se eliminará la compañia ${dataUser.company?.name} junto con todos los items, tus colaboradores serán desligados de la misma.`;

    Alert.alert(
      'Alerta',
      dataUser.company && dataUser.position === 'Manager'
        ? msg + msgWithCompany
        : msg,
      [
        {
          text: 'Cancelar',
        },
        {
          text: 'Continuar',
          onPress: () => {
            Alert.alert('ULTIMA ADVERTENCIA', '¿Desea eliminar su cuenta?', [
              {
                text: 'cancelar',
              },
              {
                text: 'eliminar',
                onPress: () => {
                  deleteUser(dataUser.id, token);
                  logOut_CS(dispatch, dataUser.id);
                  Alert.alert(
                    null,
                    'Cuenta eliminada, que tenga buen dia.',
                    [],
                    { cancelable: true }
                  );
                },
              },
            ]);
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

      {dataUser.company && dataUser.position !== 'Manager' && (
        <TouchableOpacity onPress={handleDisconnectCompany}>
          <View style={styles.viewRow}>
            <View style={styles.icon}>
              <AntDesign name="disconnect" size={30} color={orangeColor} />
            </View>
            <View style={styles.viewText}>
              <Text style={[styles.textStyle, textStyle]}>
                Desvincularme de la compañia
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {!dataUser.company && (
        <TouchableOpacity onPress={handleChangePosition}>
          <View style={styles.viewRow}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="account-arrow-right-outline"
                size={30}
                color={orangeColor}
              />
            </View>
            <View style={styles.viewText}>
              <Text style={[styles.textStyle, textStyle]}>
                Cambiar tipo de cuenta
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

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
            <AntDesign name="delete" size={30} color={errorColor} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, { color: errorColor }]}>
              Eliminar Cuenta
            </Text>
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
