import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { POSITION } from '../utils/values.enum';
import SelectItem from './SelectItem';
import BtnCustom from './BtnCustom';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal from '../styles/global';

const ChangePermissions = ({
  allUsers,
  handlerPosition,
  handleRemoveToCompany,
}) => {
  const isDarkTheme = useTheme();

  const textStyle = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  return allUsers.allCompanyUsers.map(({ id, fullName, position }) => {
    return (
      <View key={id} style={styles.viewList}>
        <Text style={[styles.text, textStyle]}>{fullName}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SelectItem
            items={POSITION}
            onValueChange={(value) => handlerPosition({ id, position: value })}
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
      </View>
    );
  });
};

const styles = StyleSheet.create({
  viewList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ChangePermissions;
