import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, Alert, Image } from 'react-native';
import { deleteDataUser, deleteUserToken } from '../../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import BtnCustom from '../../components/BtnCustom';
import { useTheme } from '../../hooks/useTheme';
import stylesGlobal, { errorColor, orangeColor, principalColor, successColor } from '../../styles/global';
import styles from './profile.Styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

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
    <View
      style={
        isDarkTheme
          ? [styles.container, stylesGlobal.backDark]
          : [styles.container, stylesGlobal.backLight]
      }>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <Text style={styles.nameUser}>{user.fullName}</Text>
          <View style={styles.viewImg}>
            <Image source={{ uri: user.image }} style={styles.img} />
          </View>
          <View style={styles.viewData}>
            <View style={styles.rowsBetween}>
              <Text style={[styles.text, styleText]}>Inicio</Text>
              <Text style={styleText}>{user.accountCreation}</Text>
            </View>
            <View style={styles.rowsBetween}>
              <Text style={[styles.text, styleText]}>Email</Text>
              <Text style={styleText}>{user.auth.email}</Text>
            </View>
          </View>

          <View style={styles.btnsView}>
            <BtnCustom
              title="Desactivar Cuenta"
              onPress={deactivateAccount}
              backgroundColor={'#000'}
              textColor={'#fff'}
            />
            <BtnCustom
              title={'Editar'}
              onPress={() => navigation.navigate('Editar Perfil')}
              backgroundColor={successColor}
              textColor={'#fff'}
            />
            <BtnCustom
              title="Cerrar Sesion"
              onPress={closeSession}
              backgroundColor={errorColor}
              textColor={'#fff'}
            />
          </View>
        </View>
        <View style={[stylesGlobal.line, styles.line]}></View>
        {user.company ? (
          <View style={styles.cards}>
            <Text style={[styles.companyTitle, styleText]}>
              {user.company.name}
            </Text>
            <View style={styles.viewImgCompany}>
              <Image source={{ uri: user.company.image }} style={styles.img} />
            </View>

            <View style={styles.viewData}>
              <View style={styles.rowsBetween}>
                <Text style={[styles.text, styleText]}>Cargo</Text>
                <Text style={styleText}>{user.position}</Text>
              </View>
            </View>

            {user.position === 'Manager' ? (
              <View style={styles.btnsView}>
                <BtnCustom
                  title={'Cargar Items'}
                  onPress={() => navigation.navigate('Cargar JSON')}
                  backgroundColor={orangeColor}
                  textColor={'#fff'}
                />
                <BtnCustom
                  title={'Editar'}
                  onPress={() => navigation.navigate('Actualizar Compañia')}
                  backgroundColor={successColor}
                  textColor={'#fff'}
                />
                <BtnCustom
                  title={'Administrar'}
                  backgroundColor={principalColor}
                  onPress={() => navigation.navigate('Administrar Permisos')}
                  textColor={'#fff'}
                />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
