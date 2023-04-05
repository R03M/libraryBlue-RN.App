import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { POSITION } from '../utils/values.enum';
import SelectItem from './SelectItem';
import BtnCustom from './BtnCustom';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const ChangePermissions = ({
  allUsers,
  handlerPosition,
  handleRemoveToCompany,
}) => {
  return Array.isArray(allUsers.allCompanyUsers) ? (
    allUsers.allCompanyUsers.map(({ id, fullName, position }) => {
      return (
        <View
          key={id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: 'bold' }}>{fullName}</Text>
          <SelectItem
            items={POSITION}
            onValueChange={handlerPosition}
            value={position}
            notItemNA={true}
          />
          <BtnCustom
            title={
              <MaterialCommunityIcons
                name="location-exit"
                size={34}
                color="red"
              />
            }
            onPress={() => handleRemoveToCompany(id, fullName)}
          />
        </View>
      );
    })
  ) : (
    <Text style={{ textAlign: 'center' }}>
      No hay colaboradores en tu compañia
    </Text>
  );
};

const styles = StyleSheet.create({});

export default ChangePermissions;
