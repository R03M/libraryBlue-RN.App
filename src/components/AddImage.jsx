import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../utils/cloudinary";
import { AntDesign } from "@expo/vector-icons";
import BtnCustom from "./BtnCustom";
import validateUrlImage from "../utils/validateUrlImage";
import noBlankSpaces from "../utils/noBlankSpaces";

const AddImage = ({ onChangeImage }) => {
  const cloudinary = "cloudinary";
  const externalURL = "externalURL";

  const [image, setImage] = useState('');
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
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
    if (valueNoSpaces === "") setError(null);
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
            style={[styles.textInput, { width: "50%" }]}
            onChangeText={handlerUrlImage}
            value={image}
            placeholder="https://img.jpg"
          />
        )}
        {image && service === externalURL ? null : (
          <View style={{ marginHorizontal: -10 }}>
            <BtnCustom
              title={"Galeria"}
              onPress={selectImage}
              backgroundColor={"purple"}
              textColor={"black"}
            />
          </View>
        )}
        {image ? (
          <BtnCustom
            title={<AntDesign name="delete" size={20} color="white" />}
            onPress={() => {
              setService(null);
              setImage(null);
            }}
            backgroundColor={"red"}
            textColor={"black"}
          />
        ) : null}
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "red",
          fontWeight: 700,
        }}
      >
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "65%",
  },
});

export default AddImage;
