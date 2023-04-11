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
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { pHTCGlobal, successColor } from '../styles/global';

const EditItem = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const { oldItem } = route.params;
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const [errorTitle, setErrorTitle] = useState('idle');
  const [errorCode, setErrorCode] = useState('idle');
  const [errorLang, setErrorLang] = useState('idle');
  const [modalImage, setModalImage] = useState(false);

  const [isEnabled, setIsEnabled] = useState(oldItem.associatedCompany);
  const { dataUser, token } = useSelector((state) => state.user);
  const fromMyCompany = dataUser.company.id === oldItem.companyId;

  const INITIAL_ITEM_STATE = {
    idUser: dataUser.id,
    idCompany: oldItem.companyId,
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
    associatedCompany: oldItem.associatedCompany,
    exitOnly: false,
  };

  const [updateItem, setUpdateItem] = useState(INITIAL_ITEM_STATE);
  
  function handleCode(value) {
    handlerValue(setUpdateItem, 'code', value);
    const error = validateString(value, 'código');
    error ? setErrorCode(error) : setErrorCode(false);
  }
  function handleTitle(value) {
    handlerValue(setUpdateItem, 'title', value);
    const error = validateString(value, 'título');
    error ? setErrorTitle(error) : setErrorTitle(false);
  }
  function handleLanguage(value) {
    handlerValue(setUpdateItem, 'language', value);
    const error = validateString(value, 'lenguaje');
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
      navigator.goBack();
      return;
    }
    dispatch(action_UpdateItem({ updateItem, token }));
    navigator.navigate('ItemsScreen');
  };

  return (
    <View style={isDarkTheme ? stylesGlobal.backDark : stylesGlobal.backLight}>
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
            <Text style={styleText}>Codigo</Text>
            <TextInput
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleCode}
              value={updateItem.code}
              placeholderTextColor={pHTCGlobal}
            />
          </View>
          <View style={styles.rows}>
            <Text style={styleText}>Titulo</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleTitle}
              value={updateItem.title}
            />
          </View>

          <View style={styles.rows}>
            <Text style={styleText}>Subtítulo</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={(value) =>
                handlerValue(setUpdateItem, 'subtitle', value)
              }
              value={updateItem.subtitle}
            />
          </View>

          <View style={styles.rows}>
            <Text style={styleText}>Stock Actual</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleCurrentStock}
              value={updateItem.currentCount}
            />
          </View>
          <View style={styles.rows}>
            <Text style={styleText}>Lenguaje</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleLanguage}
              value={updateItem.language}
            />
          </View>

          <View style={styles.rows}>
            <Text style={styleText}>Imagen</Text>
            <View style={{ width: '68%' }}>
              <AddImage
                onChangeImage={(value) =>
                  handlerValue(setUpdateItem, 'image', value)
                }
                value={updateItem.image}
              />
            </View>
          </View>
          <View style={styles.rows}>
            <Text style={styleText}>Categoria</Text>
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
            <Text style={styleText}>Edicion de</Text>
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
            <Text style={styleText}>Tipo de letra</Text>
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

          <Text style={[styleText, { textAlign: 'center' }]}>
            Ultimo conteo
          </Text>
          <View style={styles.rows}>
            <Text style={styleText}>Cantidad</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleLastCount}
              value={updateItem.lastCount}
            />
          </View>
          <View style={styles.rows}>
            <Text style={styleText}>Fecha</Text>
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

          <Text style={[styleText, { textAlign: 'center' }]}>
            Ultimo ingreso
          </Text>

          <View style={styles.rows}>
            <Text style={styleText}>Cantidad</Text>
            <TextInput
              placeholderTextColor={pHTCGlobal}
              style={[styles.textInput, styleText, { width: '60%' }]}
              onChangeText={handleItemEntry}
              value={updateItem.lastCount}
            />
          </View>
          <View style={styles.rows}>
            <Text style={styleText}>Fecha</Text>
            <View>
              <SelectDate
                value={updateItem.itemEntryDate}
                handlerDate={(value) =>
                  handlerValue(setUpdateItem, 'lastCountDate', value)
                }
              />
            </View>
          </View>
          {fromMyCompany && (
            <View style={styles.rows}>
              <Text style={styleText}>Compartido con compañia asociada</Text>
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
          )}
          <View style={{ marginTop: 20 }}>
            <BtnCustom
              title="Guardar"
              onPress={handleSave}
              backgroundColor={successColor}
              textColor={'#fff'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginVertical: 4,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '70%',
  },
});

export default EditItem;
