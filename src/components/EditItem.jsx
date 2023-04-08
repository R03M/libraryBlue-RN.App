import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import SelectItem from './SelectItem';
import SelectDate from './SelectDate';
import validateString from '../utils/validateString';
import noBlankSpaces from '../utils/noBlankSpaces';
import onlyNumbers from '../utils/onlyNumbers';
import { categories, editions, letters } from '../utils/values.enum';
import isEqual from 'lodash/isEqual';
import BtnCustom from './BtnCustom';
import { naImg } from '../utils/naImg';
import ModalImage from './ModalImage';
import handlerValue from '../utils/handlerValue';
import { useDispatch, useSelector } from 'react-redux';
import { action_UpdateItem } from '../redux/actions';
import AddImage from './AddImage';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditItem = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const { oldItem } = route.params;

  const [errorTitle, setErrorTitle] = useState('idle');
  const [errorCode, setErrorCode] = useState('idle');
  const [errorLang, setErrorLang] = useState('idle');
  const [modalImage, setModalImage] = useState(false);
  
  const [isEnabled, setIsEnabled] = useState(oldItem.associatedCompany);
  const { dataUser, token } = useSelector((state) => state.user);

  const INITIAL_ITEM_STATE = {
    idCompany: dataUser.company.id,
    id: oldItem.id,
    code: oldItem.code,
    title: oldItem.title,
    subtitle: oldItem.subtitle,
    language: oldItem.language,
    image: oldItem.image,
    edition: oldItem.edition,
    letter: oldItem.letter,
    category: oldItem.category,
    lastCount: oldItem.lastCount ? oldItem.lastCount.toString() : '',
    lastCountDate: oldItem.lastCountDate,
    currentCount: oldItem.currentCount ? oldItem.currentCount.toString() : '',
    itemEntry: oldItem.itemEntry ? oldItem.itemEntry.toString() : '',
    itemEntryDate: oldItem.itemEntryDate,
    associatedCompany: isEnabled,
    exitOnly: false,
  };

  const [updateItem, setUpdateItem] = useState(INITIAL_ITEM_STATE);

  function handleCode(value) {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setUpdateItem, 'code', valueNoSpaces);
    const error = validateString(valueNoSpaces, 'código');
    error ? setErrorCode(error) : setErrorCode(false);
  }
  function handleTitle(value) {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setUpdateItem, 'title', valueNoSpaces);
    const error = validateString(valueNoSpaces, 'título');
    error ? setErrorTitle(error) : setErrorTitle(false);
  }
  function handleLanguage(value) {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setUpdateItem, 'language', valueNoSpaces);
    const error = validateString(valueNoSpaces, 'lenguaje');
    error ? setErrorLang(error) : setErrorLang(false);
  }
  function handleCurrentStock(value) {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = onlyNumbers(valueNoSpaces);
    isValid
      ? handlerValue(setUpdateItem, 'currentCount', valueNoSpaces)
      : handlerValue(setUpdateItem, 'currentCount', '');
  }
  function handleLastCount(value) {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = onlyNumbers(valueNoSpaces);
    isValid
      ? handlerValue(setUpdateItem, 'lastCount', valueNoSpaces)
      : handlerValue(setUpdateItem, 'lastCount', '');
  }
  function handleItemEntry(value) {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = onlyNumbers(valueNoSpaces);
    isValid
      ? handlerValue(setUpdateItem, 'itemEntry', valueNoSpaces)
      : handlerValue(setUpdateItem, 'itemEntry', '');
  }

  const handleShowModalImage = () => {
    setModalImage(!modalImage);
  };

  const handleSave = () => {
    if (isEqual(updateItem, INITIAL_ITEM_STATE)) {
      Alert.alert('No hay cambios', 'El item no se actualizará', [], {
        cancelable: true,
      });
      return;
    }
    dispatch(action_UpdateItem({ updateItem, token }));
    navigator.goBack();
  };

  return (
    <>
      <ModalImage
        handleShowModalImage={handleShowModalImage}
        image={updateItem.image}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textData}>
          <View style={{ left: '20%' }}>
            <TouchableOpacity onPress={handleShowModalImage}>
              <View
                style={{
                  height: 250,
                  width: 150,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: updateItem.image ? updateItem.image : naImg,
                  }}
                  style={{
                    flex: 1,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rows}>
            <Text>Codigo</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleCode}
              value={updateItem.code}
            />
          </View>
          <View style={styles.rows}>
            <Text>Titulo</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleTitle}
              value={updateItem.title}
            />
          </View>

          <View style={styles.rows}>
            <Text>Subtítulo</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={(value) =>
                handlerValue(setUpdateItem, 'subtitle', value)
              }
              value={updateItem.subtitle}
            />
          </View>

          <View style={styles.rows}>
            <Text>Stock Actual</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleCurrentStock}
              value={updateItem.currentCount}
            />
          </View>
          <View style={styles.rows}>
            <Text>Lenguaje</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleLanguage}
              value={updateItem.language}
            />
          </View>

          <View style={styles.rows}>
            <Text>Imagen</Text>
            <AddImage
              onChangeImage={(value) =>
                handlerValue(setUpdateItem, 'image', value)
              }
              value={updateItem.image}
            />
          </View>
          <View style={styles.rows}>
            <Text>Categoria</Text>
            <View>
              <SelectItem
                value={updateItem.category}
                items={categories}
                onValueChange={(itemValue) =>
                  handlerValue(setUpdateItem, 'category', itemValue)
                }
              />
            </View>
          </View>

          <View style={styles.rows}>
            <Text>Edicion de</Text>
            <View>
              <SelectItem
                value={updateItem.edition}
                items={editions}
                onValueChange={(itemValue) =>
                  handlerValue(setUpdateItem, 'edition', itemValue)
                }
              />
            </View>
          </View>

          <View style={styles.rows}>
            <Text>Tipo de letra</Text>
            <View>
              <SelectItem
                value={updateItem.letter}
                items={letters}
                onValueChange={(itemValue) =>
                  handlerValue(setUpdateItem, 'letter', itemValue)
                }
              />
            </View>
          </View>

          <Text style={{ textAlign: 'center' }}>Ultimo conteo</Text>
          <View style={styles.rows}>
            <Text>Cantidad</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleLastCount}
              value={updateItem.lastCount}
            />
          </View>
          <View style={styles.rows}>
            <Text>Fecha</Text>
            <View>
              <SelectDate
                value={updateItem.lastCountDate}
                handlerDate={(value) =>
                  handlerValue(setUpdateItem, 'lastCountDate', value)
                }
              />
            </View>
          </View>
          <View style={styles.rows}></View>

          <Text style={{ textAlign: 'center' }}>Ultimo ingreso</Text>

          <View style={styles.rows}>
            <Text>Cantidad</Text>
            <TextInput
              style={[styles.textInput, { width: '60%' }]}
              onChangeText={handleItemEntry}
              value={updateItem.lastCount}
            />
          </View>
          <View style={styles.rows}>
            <Text>Fecha</Text>
            <View>
              <SelectDate
                value={updateItem.itemEntryDate}
                handlerDate={(value) =>
                  handlerValue(setUpdateItem, 'lastCountDate', value)
                }
              />
            </View>
          </View>
          <View style={styles.rows}>
            <Text>Compartido con compañia asociada</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#3ccc15' }}
              thumbColor={isEnabled ? '#2296f3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsEnabled(!isEnabled);
                handlerValue(setUpdateItem, 'associatedCompany', !isEnabled);
              }}
              value={isEnabled}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <BtnCustom
              title="Guardar"
              onPress={handleSave}
              backgroundColor={'green'}
              textColor={'white'}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textData: {
    padding: 20,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '70%',
  },
});

export default EditItem;
