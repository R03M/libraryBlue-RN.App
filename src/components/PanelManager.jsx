import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  action_RemoveUserOfCompany,
  action_UpdatePositionUser,
  action_getAllCompanyUsers,
} from '../redux/actions';
import ChangePermissions from './ChangePermissions';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal from '../styles/global';
import FeedbackOfAPI from './FeedbackOfAPI';
import useFeedback from '../hooks/useFeedback';

const PanelManager = () => {
  const isDarkTheme = useTheme();
  const dispatch = useDispatch();

  const { dataUser, token } = useSelector((state) => state.user);
  const { allUsers, statusUpdatePositionUser, statusRemoveUserOfC } =
    useSelector((state) => state.company);

  const feedbackOn = useFeedback(statusUpdatePositionUser);
  const feedbackDeleteUser = useFeedback(statusRemoveUserOfC);

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

  function handlerPosition(value) {
    dispatch(
      action_UpdatePositionUser({
        data: { id: value.id, position: value.position },
        token,
      })
    );
  }

  function handleRemoveToCompany(id, fullName) {
    Alert.alert(
      'Espera',
      `Eliminaras de la compañia a ${fullName}, esta accion no se puede deshacer.`,
      [
        {
          text: 'cancelar',
        },
        {
          text: 'eliminar',
          onPress: () => {
            dispatch(action_RemoveUserOfCompany({ idUser: id, token }));
          },
        },
      ]
    );
  }

  return (
    <View style={[styles.card, background]}>
      {feedbackOn && ( // alert update position
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusUpdatePositionUser} type={'update'} />
        </View>
      )}
      {feedbackDeleteUser && ( // alert delete user
        <View style={stylesGlobal.feedbackContainer}>
          <FeedbackOfAPI value={statusRemoveUserOfC} type={'delete'} />
        </View>
      )}

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
