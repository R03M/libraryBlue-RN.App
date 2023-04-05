import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, ScrollView, Alert, Image } from 'react-native';
import { deleteDataUser, deleteUserToken } from '../../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BtnCustom from '../../components/BtnCustom';
import styles from './profile.Styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.dataUser);

  const closeSession = async () => {
    try {
      await AsyncStorage.removeItem('@TokenAccess');
      await AsyncStorage.removeItem('@UserData');
      dispatch(deleteUserToken());
      dispatch(deleteDataUser());
      Alert.alert(null, 'Sesión cerrada', [], {
        cancelable: true,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log(console.error);
    }
  };

  const deactivateAccount = () => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.cardOne}>
          <Text style={styles.title}>{user.fullName}</Text>
          <Image source={{ uri: user.image }} style={styles.img} />
          <View style={{ margin: 10 }}>
            <View style={styles.rowsBetween}>
              <Text>Cuenta</Text>
              <Text>{user.position}</Text>
            </View>
            <View style={styles.rowsBetween}>
              <Text>Inicio</Text>
              <Text>{user.accountCreation}</Text>
            </View>
            <View style={styles.rowsBetween}>
              <Text>Email</Text>
              <Text>{user.auth.email}</Text>
            </View>
          </View>

          <View style={{ marginBottom: -5, alignItems: 'flex-end' }}>
            <BtnCustom
              title={<AntDesign name="edit" size={20} />}
              backgroundColor={'black'}
              onPress={() => navigation.navigate('Editar Perfil')}
              textColor={'white'}
            />
          </View>
        </View>

        {user.company ? (
          <View style={[styles.cardOne, { backgroundColor: '#bfbfbf' }]}>
            <Text style={styles.title}>Company</Text>
            <Image source={{ uri: user.company.image }} style={styles.img} />
            <View style={{ margin: 10 }}>
              <View style={styles.rowsBetween}>
                <Text>Nombre</Text>
                <Text>{user.company.name}</Text>
              </View>
            </View>

            {user.position === 'Manager' ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: -5,
                  justifyContent: 'space-between',
                }}>
                <BtnCustom
                  title={<AntDesign name="edit" size={20} />}
                  backgroundColor={'black'}
                  onPress={() => navigation.navigate('Actualizar Compañia')}
                  textColor={'white'}
                />
                <BtnCustom
                  title={
                    <MaterialIcons name="admin-panel-settings" size={20} />
                  }
                  backgroundColor={'black'}
                  onPress={() => navigation.navigate('Administrar Permisos')}
                  textColor={'white'}
                />
              </View>
            ) : null}
          </View>
        ) : null}
        <View style={styles.btnsView}>
          <Button
            title="Desactivar Cuenta"
            onPress={deactivateAccount}
            color={'#F44336'}
          />
          <Button
            title="Cerrar Sesion"
            onPress={closeSession}
            color={'#F44336'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
