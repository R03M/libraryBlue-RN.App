import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { errorColor, principalColor, successColor } from '../styles/global';
import SelectCompany from './SelectCompany';
import { Entypo } from '@expo/vector-icons';
import { action_UpdateCompany } from '../redux/actions';
import handlerValue from '../utils/handlerValue';

const ManageAssociatedCompany = () => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const { dataUser, token } = useSelector((state) => state.user);

  const [updateCompany, setUpdateCompany] = useState({
    id: dataUser.company.id,
    associatedCompany: '',
  });

  const disconnectCompanies = () => {};

  const connectCompanies = () => {
    dispatch(action_UpdateCompany({ dataCompany: updateCompany, token }));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {dataUser.company.associatedCompany ? (
        <View
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: principalColor,
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              paddingVertical: 25,
            }}>
            {dataUser.company.associatedCompany}
          </Text>

          <TouchableOpacity onPress={disconnectCompanies}>
            <View style={styles.viewRow}>
              <View style={{ paddingHorizontal: 10 }}>
                <AntDesign name="disconnect" size={30} color={errorColor} />
              </View>
              <View style={{ alignItems: 'flex-start', paddingLeft: 20 }}>
                <Text style={{ fontWeight: 'bold' }}>Desvincular</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: 'center', margin: 4 }}>
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
              <Text style={{ fontWeight: 'bold' }}>Vincular</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingLeft: 10,
  },
});

export default ManageAssociatedCompany;
