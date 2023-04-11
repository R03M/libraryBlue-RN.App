import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import stylesGlobal, { successColor } from '../styles/global';
import { useTheme } from '../hooks/useTheme';

const FeedbackOfAPI = ({ value }) => {
  const isDarkTheme = useTheme();
  const background = isDarkTheme
    ? stylesGlobal.backLight
    : stylesGlobal.backPrincipal;

  const textStyle = isDarkTheme ? null : stylesGlobal.textDark;

  const msg = {
    loading: 'Actualizando',
    succeeded: 'Listo',
    failed: 'Falló al actualizar',
  };

  if (value === 'loading') {
    return (
      <View style={[styles.container, background]}>
        <ActivityIndicator
          size="large"
          color={isDarkTheme ? '#999999' : '#B3D7FF'}
        />
        <Text style={[styles.text, textStyle]}>{msg[value]}</Text>
      </View>
    );
  } else if (value === 'succeeded') {
    return (
      <View style={[styles.container, background]}>
        <View style={[styles.viewIcon, { backgroundColor: successColor }]}>
          <FontAwesome5 name="check" size={24} color="#fff" />
        </View>
        <Text style={[styles.text, textStyle]}>{msg[value]}</Text>
      </View>
    );
  } else if (value === 'failed') {
    return (
      <View style={[styles.container, background]}>
        <View style={[styles.viewIcon, { backgroundColor: 'red' }]}>
          <FontAwesome name="times" size={24} color="#fff" />
        </View>
        <Text style={[styles.text, textStyle]}>{msg[value]}</Text>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  viewIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeedbackOfAPI;
