import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../utils/cloudinary';
import { AntDesign } from '@expo/vector-icons';
import BtnCustom from './BtnCustom';
import validateUrlImage from '../utils/validateUrlImage';
import noBlankSpaces from '../utils/noBlankSpaces';
import stylesGlobal, {
  errorColor,
  orangeColor,
  pHTCGlobal,
  principalColor,
  whiteColor,
} from '../styles/global';
import { useTheme } from '../hooks/useTheme';

const AddImage = ({ onChangeImage, value }) => {
  const isDarkTheme = useTheme();
  const cloudinary = 'cloudinary';
  const externalURL = 'externalURL';

  const [image, setImage] = useState(value);
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.canceled) {
        const response = await uploadImage(result.assets[0].uri);
        setImage(response);
        setService(cloudinary);
      }
    }
  };

  const handlerUrlImage = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = validateUrlImage(valueNoSpaces);
    if (isValid) {
      setService(externalURL);
      setImage(valueNoSpaces);
      setError(null);
    }
    if (isValid !== true) setError(isValid);
    if (valueNoSpaces === '') setError(null);
  };

  useEffect(() => {
    if (!error) {
      const setImageInUserData = () => {
        onChangeImage(image);
      };
      setImageInUserData();
    }
  }, [image]);

  return (
    <View>
      <View style={styles.rows}>
        {image && service === cloudinary ? null : (
          <TextInput
            style={
              isDarkTheme
                ? [styles.textInput, stylesGlobal.textDark]
                : [styles.textInput, stylesGlobal.textLight]
            }
            onChangeText={handlerUrlImage}
            value={image}
            placeholder="https://img.jpg"
            placeholderTextColor={pHTCGlobal}
          />
        )}
        {image && service === externalURL ? null : (
          <View style={{ marginHorizontal: -10 }}>
            <BtnCustom
              title={'Galeria'}
              onPress={selectImage}
              backgroundColor={orangeColor}
              textColor={'#fff'}
            />
          </View>
        )}
        {image ? (
          <BtnCustom
            title={<AntDesign name="delete" size={20} />}
            onPress={() => {
              setService(null);
              setImage(null);
            }}
            backgroundColor={errorColor}
            textColor={whiteColor}
          />
        ) : null}
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: errorColor,
          fontWeight: 700,
          width: '80%',
          left: 15,
        }}>
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  textInput: {
    borderBottomColor: principalColor,
    borderBottomWidth: 1,
    width: '65%',
  },
});

export default AddImage;
