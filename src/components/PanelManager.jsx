import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { action_getAllCompanyUsers } from '../redux/actions';
import ChangePermissions from './ChangePermissions';

const PanelManager = () => {
  const dispatch = useDispatch();
  const { dataUser, token } = useSelector((state) => state.user);
  const { allUsers } = useSelector((state) => state.company);

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
    <View style={styles.card}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ChangePermissions
          allUsers={allUsers}
          handlerPosition={handlerPosition}
          handleRemoveToCompany={handleRemoveToCompany}
        />
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
});

export default PanelManager;
