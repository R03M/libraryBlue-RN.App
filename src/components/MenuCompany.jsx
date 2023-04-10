import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import stylesGlobal, {
  errorColor,
  successColor,
} from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../redux/actions';

const MenuCompany = () => {
  const dispatch = useDispatch();
  const { dataUser, token } = useSelector((state) => state.user);

  const navigation = useNavigation();

  useEffect(() => {
    const idCompany = dataUser.company.id;
    dispatch(getAllCompanies({ idCompany, token }));
  }, []);

  const handlerDeleteC = () => {};

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('UploadJson')}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="upload" size={30} color={'#000'} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Cargar Items</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UpdateCompany')}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="edit" size={30} color={successColor} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Editar</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ManageAssociatedCompany')}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <FontAwesome5 name="user-friends" size={30} color={'#dfbc34'} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Compañia Asociada</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PanelManager')}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <MaterialIcons
              name="admin-panel-settings"
              size={30}
              color={'#ff7043'}
            />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Administrar Permisos</Text>
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
      <TouchableOpacity onPress={handlerDeleteC}>
        <View style={styles.viewRow}>
          <View style={{ paddingHorizontal: 10 }}>
            <AntDesign name="delete" size={30} color={errorColor} />
          </View>
          <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>Eliminar Compañia</Text>
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

export default MenuCompany;
