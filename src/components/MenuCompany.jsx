import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import stylesGlobal, { errorColor, successColor } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { action_DeleteCompany, getAllCompanies } from '../redux/actions';
import { useTheme } from '../hooks/useTheme';

const MenuCompany = () => {
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

  useEffect(() => {
    const idCompany = dataUser.company.id;
    dispatch(getAllCompanies({ idCompany, token }));
  }, []);

  const handlerDeleteC = () => {
    Alert.alert(
      'Alerta',
      'Eliminar compañia es un cambio irreversible, se eliminaran los items y tus colaboradores seran desligados de la compañia.',
      [
        {
          text: 'cancelar',
        },
        {
          text: 'eliminar',
          onPress: () => {
            dispatch(
              action_DeleteCompany({ idCompany: dataUser.company.id, token })
            );
            navigation.navigate('ProfileScreen');
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={[styles.container, background]}>
      <TouchableOpacity onPress={() => navigation.navigate('UploadJson')}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="upload" size={30} color={'#20c9c9'} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Cargar Items</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UpdateCompany')}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="edit" size={30} color={successColor} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Editar</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ManageAssociatedCompany')}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <FontAwesome5 name="user-friends" size={30} color={'#dfbc34'} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Compañia Asociada</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PanelManager')}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <MaterialIcons
              name="admin-panel-settings"
              size={30}
              color={'#ff7043'}
            />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>
              Administrar Permisos
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={[stylesGlobal.line, styles.lineDangerZ]}>
        <Text style={[styles.titleDangeZ, textStyle]}>Zona Peligrosa</Text>
      </View>
      <TouchableOpacity onPress={handlerDeleteC}>
        <View style={styles.viewRow}>
          <View style={styles.icon}>
            <AntDesign name="delete" size={30} color={errorColor} />
          </View>
          <View style={styles.viewText}>
            <Text style={[styles.textStyle, textStyle]}>Eliminar Compañia</Text>
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

export default MenuCompany;
