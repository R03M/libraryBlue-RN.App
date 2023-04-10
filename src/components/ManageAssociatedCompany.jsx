import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import stylesGlobal, {
  errorColor,
  principalColor,
  successColor,
} from '../styles/global';
import SelectCompany from './SelectCompany';
import { Entypo } from '@expo/vector-icons';
import { action_UpdateCompany } from '../redux/actions';
import handlerValue from '../utils/handlerValue';
import { useTheme } from '../hooks/useTheme';

const ManageAssociatedCompany = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();

  const { companies } = useSelector((state) => state.company);
  const { dataUser, token } = useSelector((state) => state.user);

  const [updateCompany, setUpdateCompany] = useState({
    id: dataUser.company.id,
    associatedCompany: '',
  });

  const background = isDarkTheme
    ? stylesGlobal.backDark
    : stylesGlobal.backLight;

  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const disconnectCompanies = () => {};

  const connectCompanies = () => {
    if (updateCompany.associatedCompany !== '') {
      dispatch(action_UpdateCompany({ dataCompany: updateCompany, token }));
      return;
    }
    Alert.alert(null, 'Se requiere nombre y codigo valido', [], {
      cancelable: true,
    });
  };

  return (
    <View style={[styles.container, background]}>
      {dataUser.company.associatedCompany ? (
        <View style={styles.cardAssociated}>
          <Text style={styles.textName}>
            {dataUser.company.associatedCompany}
          </Text>
          <TouchableOpacity onPress={disconnectCompanies}>
            <View style={styles.viewRow}>
              <AntDesign name="disconnect" size={30} color={errorColor} />
              <View style={styles.viewText}>
                <Text style={[styles.text, textStyle]}>Desvincular</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.viewSelectCompany}>
          <View style={{ width: '100%' }}>
            <SelectCompany
              companies={companies}
              associateCompany={(value) =>
                handlerValue(setUpdateCompany, 'associatedCompany', value)
              }
            />
          </View>
          <TouchableOpacity onPress={connectCompanies}>
            <View style={styles.viewRow}>
              <Entypo name="link" size={30} color={successColor} />
              <Text style={[styles.text, textStyle]}>Vincular</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft: 10,
  },
  cardAssociated: {
    width: '100%',
    padding: 10,
    backgroundColor: principalColor,
    borderRadius: 8,
  },
  textName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 25,
  },
  viewText: {
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  text: {
    fontWeight: 'bold',
  },
  viewSelectCompany: {
    alignItems: 'center',
    margin: 4,
  },
});

export default ManageAssociatedCompany;
