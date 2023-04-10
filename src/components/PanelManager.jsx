import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { action_getAllCompanyUsers } from '../redux/actions';
import ChangePermissions from './ChangePermissions';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal from '../styles/global';

const PanelManager = () => {
  const isDarkTheme = useTheme();
  const dispatch = useDispatch();

  const { dataUser, token } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.company);

  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;

  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  useEffect(() => {
    const companyName = dataUser.company.name;
    dispatch(action_getAllCompanyUsers({ companyName, token }));
  }, []);

  function handlerPosition() {}

  function handleRemoveToCompany(id, fullName) {
    Alert.alert(
      'Espera',
      `La eliminaras de la compañia a ${fullName}, esta accion no se puede deshacer.`,
      [
        {
          text: 'eliminar',
          onPress: () => {
            console.log('delete user', id);
          },
        },
        {
          text: 'cancelar',
        },
      ]
    );
  }

  return (
    <View style={[styles.card, background]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {Array.isArray(allUsers.allCompanyUsers) ? (
          <View style={{ flex: 1, width: '100%' }}>
            <ChangePermissions
              allUsers={allUsers}
              handlerPosition={handlerPosition}
              handleRemoveToCompany={handleRemoveToCompany}
            />
          </View>
        ) : (
          <Text style={[styles.textNoColab, textStyle]}>
            No hay colaboradores en tu compañia
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: '4%',
    justifyContent: 'space-between',
  },
  textNoColab: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PanelManager;
