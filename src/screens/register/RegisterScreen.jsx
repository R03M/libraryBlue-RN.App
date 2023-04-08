import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BtnCustom from '../../components/BtnCustom';
import { positionInf } from '../../utils/positionInf';
import { checkEmailToRegister, registerAccount } from '../../redux/actions';
import { validateEmail } from '../../utils/validateEmail';
import { cleanResponseEmailToRegister } from '../../redux/userSlice';
import { validatePassword } from '../../utils/password';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import handlerValue from '../../utils/handlerValue';
import IconStatus from '../../components/IconStatus';
import styles from './registerS.Styles';
import AddImage from '../../components/AddImage';
import stylesGlobal, {
  errorColor,
  pHTCGlobal,
  principalColor,
  successColor,
  whiteColor,
} from '../../styles/global';
import { useTheme } from '../../hooks/useTheme';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();

  const [screen, setScreen] = useState('auth');
  const [errorEmail, setErrorEmail] = useState(null);
  const [thereIsEmail, setThereIsEmail] = useState('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState(null);

  const { statusCreateAccount, errorCreateAccount } = useSelector(
    (state) => state.user
  );
  const infEmail = useSelector(
    (state) => state.user.responseCheckEmailToRegister.infocheck
  );

  const [auth, setAuth] = useState({
    email: '',
    password: '',
    isGoogle: false,
  });
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    image: null,
    position: null,
    status: 'Active',
  });

  const nextScreen = () => {
    if (thereIsEmail === 404) {
      setScreen('userData');
    }
    if (thereIsEmail === 200) {
      Alert.alert(
        null,
        `No puedes crear una cuenta con el correo ${auth.email} porque ya 
        existe, si es tu cuenta, ingresa directamente en el apartado Login.`,
        [],
        { cancelable: true }
      );
    }
  };

  const register = () => {
    dispatch(registerAccount({ data: { ...auth, ...userData } }));
  };

  const ShowPassW = () => {
    return (
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Entypo
          name={showPassword ? 'eye-with-line' : 'eye'}
          size={24}
          color={isDarkTheme ? '#fff' : '#000'}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  };

  const descriptionTypeAccound = () => {
    if (userData.position === 'Observant') {
      return (
        <Text
          style={
            isDarkTheme
              ? [styles.descripPosition, { color: whiteColor }]
              : styles.descripPosition
          }>
          {positionInf.Observant}
        </Text>
      );
    }
    if (userData.position === 'Manager') {
      return (
        <Text
          style={
            isDarkTheme
              ? [styles.descripPosition, { color: whiteColor }]
              : styles.descripPosition
          }>
          {positionInf.Manager}
        </Text>
      );
    }
  };

  const emailValidation = () => {
    const errorValidate = validateEmail(auth.email);
    !errorValidate
      ? (dispatch(checkEmailToRegister(auth.email)), setErrorEmail(null))
      : setErrorEmail(errorValidate);
  };

  const passwordValidation = (value) => {
    const passwordValidate = validatePassword(value);
    !passwordValidate
      ? setErrorPassword(null)
      : setErrorPassword(passwordValidate);
  };

  useEffect(() => {
    const handlerStatusCheckEmail = () => {
      if (infEmail) {
        return !infEmail.email ? setThereIsEmail(404) : setThereIsEmail(200);
      }
    };
    handlerStatusCheckEmail();
  }, [infEmail]);

  const handlerChangeImage = (value) => {
    handlerValue(setUserData, 'image', value);
  };

  return (
    <View
      style={
        isDarkTheme
          ? [styles.container, stylesGlobal.backDark]
          : styles.container
      }>
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        <Text
          style={
            isDarkTheme
              ? [stylesGlobal.title, stylesGlobal.textDark]
              : stylesGlobal.title
          }>
          Registro
        </Text>
        <View style={stylesGlobal.line}></View>

        {!userData.image ? null : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Image
              source={{ uri: userData.image }}
              style={{
                height: 130,
                width: 130,
                borderRadius: 10,
              }}
            />
          </View>
        )}
        <View style={styles.line}></View>
        {screen === 'auth' ? (
          <View style={styles.userAuth}>
            <View style={styles.viewEmailandPass}>
              <TextInput
                style={
                  isDarkTheme
                    ? [
                        stylesGlobal.textInput,
                        stylesGlobal.textDark,
                        { width: '90%' },
                      ]
                    : [stylesGlobal.textInput, { width: '90%' }]
                }
                onChangeText={(value) => {
                  handlerValue(setAuth, 'email', value);
                  dispatch(cleanResponseEmailToRegister());
                  setThereIsEmail('idle');
                }}
                value={auth.email}
                placeholder="Email"
                placeholderTextColor={pHTCGlobal}
                onBlur={emailValidation}
              />
              <IconStatus value={thereIsEmail} typePositive={false} />
            </View>

            {errorEmail ? (
              <Text style={{ color: 'red', fontWeight: 700 }}>
                {errorEmail}
              </Text>
            ) : null}

            <View style={styles.viewEmailandPass}>
              <TextInput
                style={
                  isDarkTheme
                    ? [
                        stylesGlobal.textInput,
                        stylesGlobal.textDark,
                        { width: '90%' },
                      ]
                    : [stylesGlobal.textInput, { width: '90%' }]
                }
                onChangeText={(value) => {
                  thereIsEmail === 200
                    ? (handlerValue(setAuth, 'password', ''),
                      Alert.alert(
                        null,
                        'Si la cuenta no es aceptada ¿que sentido tiene escribir una contraseña?',
                        [],
                        {
                          cancelable: true,
                        }
                      ))
                    : handlerValue(setAuth, 'password', value);
                  setErrorPassword(null);
                  passwordValidation(value);
                }}
                value={auth.password}
                placeholder="Password"
                secureTextEntry={!showPassword}
                placeholderTextColor={pHTCGlobal}
              />
              <ShowPassW />
            </View>
            {!errorPassword ? null : (
              <Text style={{ color: errorColor, fontWeight: 700 }}>
                {errorPassword}
              </Text>
            )}
            <View style={{ marginTop: 30 }}>
              <Button
                title="Continuar"
                onPress={nextScreen}
                color={principalColor}
              />
            </View>
            {thereIsEmail === 200 ? (
              <View style={[styles.viewError, { backgroundColor: errorColor }]}>
                <Text style={[styles.textError, { color: whiteColor }]}>
                  Ya existe una cuenta con ese correo electronico, si es tuya
                  puedes ingresar directamente en el apartado Login.
                </Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.userData}>
            <View style={styles.rows}>
              <Text
                style={
                  isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight
                }>
                Nombre
              </Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, 'firstName', value)
                }
                value={userData.firstName}
                placeholder="Jhon"
                placeholderTextColor={pHTCGlobal}
              />
            </View>
            <View style={styles.rows}>
              <Text
                style={
                  isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight
                }>
                Apellido
              </Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, 'lastName', value)
                }
                value={userData.lastName}
                placeholder="Smith"
                placeholderTextColor={pHTCGlobal}
              />
            </View>

            <View style={styles.rows}>
              <Text
                style={
                  isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight
                }>
                Imagen
              </Text>
              <View style={{ width: '68%' }}>
                <AddImage onChangeImage={handlerChangeImage} />
              </View>
            </View>

            <View style={styles.rows}>
              <Text
                style={
                  isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight
                }>
                Cuenta
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '65%',
                }}>
                {userData.position === 'Observant' ? null : (
                  <BtnCustom
                    title={'Coordinador'}
                    onPress={() =>
                      handlerValue(setUserData, 'position', 'Manager')
                    }
                    backgroundColor={principalColor}
                    textColor={'#fff'}
                  />
                )}
                {userData.position === 'Manager' ? null : (
                  <BtnCustom
                    title={'Cooperador'}
                    onPress={() =>
                      handlerValue(setUserData, 'position', 'Observant')
                    }
                    backgroundColor={principalColor}
                    textColor={'#fff'}
                  />
                )}

                {userData.position ? (
                  <BtnCustom
                    title={<AntDesign name="delete" size={20} />}
                    onPress={() => handlerValue(setUserData, 'position', null)}
                    backgroundColor={errorColor}
                    textColor={whiteColor}
                  />
                ) : null}
              </View>
            </View>
            {descriptionTypeAccound()}
            <View style={styles.rows}>
              <BtnCustom
                title={'Go Back'}
                onPress={() => setScreen('auth')}
                backgroundColor={'#000'}
                textColor={'#fff'}
              />
              <BtnCustom
                title={'Registrar'}
                onPress={register}
                backgroundColor={successColor}
                textColor={'#fff'}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
