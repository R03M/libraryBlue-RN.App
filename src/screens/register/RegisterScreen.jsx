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
// import * as ImagePicker from "expo-image-picker";
import { positionInf } from '../../utils/positionInf';
// import { uploadImage } from "../../utils/cloudinary";
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
import stylesGlobal from '../../styles/global';
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
          color="black"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    );
  };

  const descriptionTypeAccound = () => {
    if (userData.position === 'Observant') {
      return (
        <Text style={styles.descripPosition}>{positionInf.Observant}</Text>
      );
    }
    if (userData.position === 'Manager') {
      return <Text style={styles.descripPosition}>{positionInf.Manager}</Text>;
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 10 }}>
            Registro
          </Text>
          {!userData.image ? null : (
            <Image
              source={{ uri: userData.image }}
              style={{
                height: 60,
                width: 60,
                borderRadius: 10,
                marginHorizontal: 10,
                marginTop: -10,
              }}
            />
          )}
        </View>
        <View style={styles.line}></View>
        {screen === 'auth' ? (
          <View style={styles.userAuth}>
            <View style={styles.viewEmailandPass}>
              <TextInput
                style={[styles.textInputAuth, { width: '90%' }]}
                onChangeText={(value) => {
                  handlerValue(setAuth, 'email', value);
                  dispatch(cleanResponseEmailToRegister());
                  setThereIsEmail('idle');
                }}
                value={auth.email}
                placeholder="Email"
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
                style={[styles.textInputAuth, { width: '90%' }]}
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
              />
              <ShowPassW />
            </View>
            {!errorPassword ? null : (
              <Text style={{ color: 'red', fontWeight: 700 }}>
                {errorPassword}
              </Text>
            )}
            <View style={{ marginTop: 20 }}>
              <Button title="Continuar" onPress={nextScreen} />
            </View>
            {thereIsEmail === 200 ? (
              <View style={styles.viewError}>
                <Text style={styles.textError}>
                  Ya existe una cuenta con ese correo electronico, si es tuya
                  puedes ingresar directamente en el apartado Login.
                </Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.userData}>
            <View style={styles.rows}>
              <Text>Nombre</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, 'firstName', value)
                }
                value={userData.firstName}
                placeholder="Jhon"
              />
            </View>
            <View style={styles.rows}>
              <Text>Apellido</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(value) =>
                  handlerValue(setUserData, 'lastName', value)
                }
                value={userData.lastName}
                placeholder="Smith"
              />
            </View>

            <AddImage onChangeImage={handlerChangeImage} />

            <View style={styles.rows}>
              <Text>Cuenta</Text>
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
                    backgroundColor={'black'}
                    textColor={'white'}
                  />
                )}
                {userData.position === 'Manager' ? null : (
                  <BtnCustom
                    title={'Cooperador'}
                    onPress={() =>
                      handlerValue(setUserData, 'position', 'Observant')
                    }
                    backgroundColor={'black'}
                    textColor={'white'}
                  />
                )}

                {userData.position ? (
                  <BtnCustom
                    title={<AntDesign name="delete" size={20} color="white" />}
                    onPress={() => handlerValue(setUserData, 'position', null)}
                    backgroundColor={'red'}
                    textColor={'black'}
                  />
                ) : null}
              </View>
            </View>
            {descriptionTypeAccound()}
            <View style={styles.rows}>
              <BtnCustom
                title={'Go Back'}
                onPress={() => setScreen('auth')}
                backgroundColor={'#cca120'}
                textColor={'white'}
              />
              <BtnCustom
                title={'Registrar'}
                onPress={register}
                backgroundColor={'#4caf50'}
                textColor={'white'}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
