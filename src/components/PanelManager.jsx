import React from 'react';
import { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { action_getAllCompanyUsers } from '../redux/actions';
import SelectItem from './SelectItem';
import { POSITION } from '../utils/values.enum';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnCustom from './BtnCustom';

const PanelManager = ({
  companyName,
  modalPanelManager,
  setModalPanelManager,
}) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(action_getAllCompanyUsers({ companyName }));
  }, []);

  function handlerPosition() {}

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalPanelManager}
      onRequestClose={() => setModalPanelManager(!modalPanelManager)}>
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 20,
            }}>
            Cambiar permisos
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {allUsers?.map(({ id, fullName, position }) => {
              return (
                position !== 'Manager' && (
                  <View
                    key={id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>{fullName}</Text>
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
                    />
                  </View>
                )
              );
            })}
          </ScrollView>
          <Button
            title="Hecho"
            onPress={() => setModalPanelManager(!modalPanelManager)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    height: '80%',
    backgroundColor: 'white',
    margin: '4%',
    padding: '4%',
    borderRadius: 8,
    borderColor: '#5998c0',
    borderWidth: 1,
    backgroundColor: 'grey',
  },
});

export default PanelManager;
