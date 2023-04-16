import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Updates from 'expo-updates';
import { blackColor, principalColor, whiteColor } from '../styles/global';

const UpdateApp = ({ setUpdateAvailable }) => {
  useEffect(() => {
    async function checkForUpdate() {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateAvailable(true);
      }
    }
    checkForUpdate();
  }, []);

  function handleUpdate() {
    Updates.fetchUpdateAsync().then(() => {
      Updates.reloadFromCache();
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#155a95',
      }}>
      <View
        style={{
          backgroundColor: whiteColor,
          paddingVertical: 30,
          paddingHorizontal: 20,
          borderRadius: 8,
        }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          Hay una actualización disponible.
        </Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Descargar actualización"
            onPress={handleUpdate}
            color={blackColor}
          />
        </View>
      </View>
    </View>
  );
};

export default UpdateApp;
