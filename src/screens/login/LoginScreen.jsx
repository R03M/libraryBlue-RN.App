import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  cleanErrorLogin,
  cleanResponseEmail,
  cleanStatusLogin,
} from '../../redux/userSlice';
import { validateEmail } from '../../utils/validateEmail';
import { loginAccount, checkEmail } from '../../redux/actions';
import { Entypo } from '@expo/vector-icons';
import IconStatus from '../../components/IconStatus';
import styles from './loginS.Styles';
import { useTheme } from '../../hooks/useTheme';
import stylesGlobal, {
  errorColor,
  pHTCGlobal,
  principalColor,
} from '../../styles/global';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();
  const infEmail = useSelector(
    (state) => state.user.responseCheckEmail.infocheck
  );
  const { statusLogin, errorLogin } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [thereIsEmail, setThereIsEmail] = useState('idle');

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

  const handlerValidation = () => {
    const errorM = validateEmail(email);
    !errorM
      ? (dispatch(checkEmail(email)), setErrorEmail(null))
      : setErrorEmail(errorM);
  };

  const handlerChange = (value) => {
    dispatch(cleanResponseEmail());
    dispatch(cleanStatusLogin());
    dispatch(cleanErrorLogin());
    setEmail(value);
  };

  const handlerPassW = (value) => {
    dispatch(cleanErrorLogin());
    dispatch(cleanStatusLogin());
    if (thereIsEmail === 404) {
      setPassword(''),
        Alert.alert(
          null,
          'Sin un cuenta existente ¿que sentido tiene escribir una contraseña?',
          [],
          {
            cancelable: true,
          }
        );
      return;
    }
    setPassword(value);
  };

  const logIn = () => {
    if (thereIsEmail === 200) {
      dispatch(loginAccount({ email, password }));
    }
    if (thereIsEmail === 404) {
      Alert.alert(null, `Cuenta inexistente`, [], {
        cancelable: true,
      });
    }
  };

  useEffect(() => {
    const handlerStatusCheckEmail = () => {
      if (infEmail) {
        return !infEmail.email ? setThereIsEmail(404) : setThereIsEmail(200);
      }
    };
    handlerStatusCheckEmail();
  }, [infEmail]);

  useEffect(() => {
    return () => {
      dispatch(cleanResponseEmail());
    };
  }, []);

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
          Iniciar Sesión
        </Text>
        <View style={stylesGlobal.line}></View>
        <View style={styles.subContainer}>
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
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(value) => {
                handlerChange(value);
                setThereIsEmail('idle');
              }}
              placeholderTextColor={pHTCGlobal}
              value={email}
              onBlur={handlerValidation}
            />
            <IconStatus value={thereIsEmail} typePositive={true} />
          </View>
          {errorEmail ? (
            <Text style={{ color: 'red' }}>{errorEmail}</Text>
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
              onChangeText={handlerPassW}
              value={password}
              placeholder="Password"
              secureTextEntry={!showPassword}
              placeholderTextColor={pHTCGlobal}
              onSubmitEditing={logIn}
            />
            <ShowPassW />
          </View>
          <View style={{ marginTop: 30 }}>
            <Button
              title="Iniciar sesión"
              onPress={logIn}
              color={principalColor}
            />
          </View>
        </View>
        {thereIsEmail === 404 ? (
          <View style={[styles.viewError, { backgroundColor: errorColor }]}>
            <Text style={styles.textError}>
              No existe una cuenta con el email {email}
            </Text>
          </View>
        ) : null}
        {statusLogin === 'loading' && (
          <ActivityIndicator
            size="large"
            color={principalColor}
            style={{ marginVertical: '10%' }}
          />
        )}
        {errorLogin === 401 && (
          <View style={[styles.viewError, { backgroundColor: errorColor }]}>
            <Text style={styles.textError}>Contraseña incorrecta</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
