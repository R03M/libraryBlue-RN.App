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
      <View style={styles.container}>
        <View style={styles.cards}>
          <Text style={styles.nameUser}>{user.fullName}</Text>
          <View style={styles.viewImg}>
            <Image source={{ uri: user.image }} style={styles.img} />
          </View>
          <View style={styles.viewData}>
            <View style={styles.rowsBetween}>
              <Text style={styles.text}>Inicio</Text>
              <Text>{user.accountCreation}</Text>
            </View>
            <View style={styles.rowsBetween}>
              <Text style={styles.text}>Email</Text>
              <Text>{user.auth.email}</Text>
            </View>
          </View>

          <View style={styles.btnsView}>
            <BtnCustom
              title="Desactivar Cuenta"
              onPress={deactivateAccount}
              backgroundColor={'black'}
              textColor={'white'}
            />
            <BtnCustom
              title="Cerrar Sesion"
              onPress={closeSession}
              backgroundColor={'#F44336'}
              textColor={'white'}
            />
            <BtnCustom
              title={'Editar'}
              backgroundColor={'#5998c0'}
              onPress={() => navigation.navigate('Editar Perfil')}
              textColor={'white'}
            />
          </View>
        </View>
        <View style={styles.line}></View>
        {user.company ? (
          <View style={styles.cards}>
            <Text style={styles.companyTitle}>{user.company.name}</Text>
            <View style={styles.viewImgCompany}>
              <Image source={{ uri: user.company.image }} style={styles.img} />
            </View>

            <View style={styles.viewData}>
              <View style={styles.rowsBetween}>
                <Text style={styles.text}>Cargo</Text>
                <Text>{user.position}</Text>
              </View>
            </View>

            {user.position === 'Manager' ? (
              <View
                style={styles.btnsView}>
                <BtnCustom
                  title={'Editar'}
                  backgroundColor={'#5998c0'}
                  onPress={() => navigation.navigate('Actualizar Compañia')}
                  textColor={'white'}
                />
                <BtnCustom
                  title={'Cargar Items'}
                  backgroundColor={'#5998c0'}
                  onPress={() => navigation.navigate('Cargar JSON')}
                  textColor={'white'}
                />
                <BtnCustom
                  title={'Administrar'}
                  backgroundColor={'#5998c0'}
                  onPress={() => navigation.navigate('Administrar Permisos')}
                  textColor={'white'}
                />
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
