import React, { useState } from 'react';
import { View, Text, Switch, Button } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateThemeReducer,
  updateUDSReducer,
} from '../../redux/settingsSlice';
import { useTheme } from '../../hooks/useTheme';
import styles from './settings.Styles';
import stylesGlobal from '../../styles/global';
import { LS_CONFIG, lsSetItems } from '../../utils/localStorage.js';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();

  const { theme, useDeviceSettings } = useSelector(
    (state) => state.settings.settings
  );

  const [settings, setSettings] = useState({ theme, useDeviceSettings });

  useEffect(() => {
    const updateSettings = () => {
      lsSetItems(LS_CONFIG, settings);
      dispatch(updateThemeReducer(settings.theme));
      dispatch(updateUDSReducer(settings.useDeviceSettings));
    };
    updateSettings();
  }, [settings]);

  const handleThemeChange = (newTheme) => {
    setSettings((prevSettings) => ({ ...prevSettings, theme: newTheme }));
  };

  const handleDeviceSettingsChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      useDeviceSettings: !prevSettings.useDeviceSettings,
    }));
  };

  return (
    <View
      style={
        isDarkTheme
          ? [styles.container, stylesGlobal.backDark]
          : [styles.container, stylesGlobal.backLight]
      }>
      <View style={styles.subTitle}>
        <Text
          style={isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight}>
          Tema
        </Text>
      </View>

      {!useDeviceSettings ? (
        <View style={styles.inputContainer}>
          <Button
            title={'Claro'}
            onPress={() => handleThemeChange('light')}
            color={theme === 'light' ? '#5998c0' : 'grey'}
          />
          <Button
            title={'Oscuro'}
            onPress={() => handleThemeChange('dark')}
            color={theme === 'dark' ? '#5998c0' : 'grey'}
          />
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <Text
          style={isDarkTheme ? stylesGlobal.textDark : stylesGlobal.textLight}>
          Usar configuración del dispositivo
        </Text>
        <Switch
          trackColor={{ false: 'red', true: '#1ed760' }}
          thumbColor={useDeviceSettings ? '#fff' : 'grey'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleDeviceSettingsChange}
          value={useDeviceSettings}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
