import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Button,
  TextInput,
  Switch,
  Image,
  Alert,
} from 'react-native';
import handlerValue from '../utils/handlerValue';
import AddImage from './AddImage';
import SelectItem from './SelectItem';
import SelectDate from './SelectDate';
import { categories, editions, letters } from '../utils/values.enum';
import validateName from '../utils/validateString';
import noBlankSpaces from '../utils/noBlankSpaces';
import onlyNumbers from '../utils/onlyNumbers';
import { useDispatch, useSelector } from 'react-redux';
import { createNewItem } from '../redux/actions';

const CreateNewItem = ({ modalItem, setModalItem }) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [errorTitle, setErrorTitle] = useState('idle');
  const [errorCode, setErrorCode] = useState('idle');
  const [errorLang, setErrorLang] = useState('idle');

  const idCompany = useSelector((state) => state.user.dataUser.company.id);

  const INITIAL_NEW_ITEM_STATE = {
    code: '',
    title: '',
    subtitle: '',
    language: '',
    image: '',
    edition: 'N/A',
    letter: 'N/A',
    category: 'N/A',
    lastCount: null,
    lastCountDate: null,
    currentCount: null,
    itemEntryDate: null,
    associatedCompany: false,
  };

  const [newItem, setNewItem] = useState(INITIAL_NEW_ITEM_STATE);

  const Asterisk = () => {
    return (
      <Text
        style={{
          color: '#2296f3',
          marginHorizontal: 2,
        }}>
        *
      </Text>
    );
  };

  const handleCode = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setNewItem, 'code', valueNoSpaces);
    const error = validateName(valueNoSpaces, 'código');
    error ? setErrorCode(error) : setErrorCode(false);
  };

  const handleTitle = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setNewItem, 'title', valueNoSpaces);
    const error = validateName(valueNoSpaces, 'título');
    error ? setErrorTitle(error) : setErrorTitle(false);
  };
  const handleLanguage = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    handlerValue(setNewItem, 'language', valueNoSpaces);
    const error = validateName(valueNoSpaces, 'lenguaje');
    error ? setErrorLang(error) : setErrorLang(false);
  };

  const handleLastCount = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = onlyNumbers(valueNoSpaces);
    isValid
      ? handlerValue(setNewItem, 'lastCount', valueNoSpaces)
      : handlerValue(setNewItem, 'lastCount', '');
  };

  const handleCurrentCount = (value) => {
    const valueNoSpaces = noBlankSpaces(value);
    const isValid = onlyNumbers(valueNoSpaces);
    isValid
      ? handlerValue(setNewItem, 'currentCount', valueNoSpaces)
      : handlerValue(setNewItem, 'currentCount', '');
  };

  const createItem = () => {
    if (errorTitle || errorCode || errorLang) {
      Alert.alert(
        'Faltan datos basicos',
        'Revisa: Código, Nombre, Lenguaje',
        [],
        {
          cancelable: true,
        }
      );
      return;
    }
    const item = { ...newItem, ...{ idCompany } };
    dispatch(createNewItem({ item }));
    setNewItem({
      ...INITIAL_NEW_ITEM_STATE,
    });
  };

  return (
    <View style={styles.modalView}>
      {newItem.image && (
        <View style={styles.viewWithImg}>
          <View
            style={{
              height: 110,
              width: 70,
              borderRadius: 4,
              overflow: 'hidden',
            }}>
            <Image
              source={{ uri: newItem.image }}
              style={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.rowsView}>
          <Text>
            Código <Asterisk />
          </Text>
          <TextInput
            style={[styles.textInput, { width: '60%' }]}
            onChangeText={handleCode}
            value={newItem.code}
          />
        </View>

        <Text style={{ color: 'red', textAlign: 'center' }}>
          {errorCode !== 'idle' && errorCode}
        </Text>
        <View style={styles.rowsView}>
          <Text>
            Titulo <Asterisk />
          </Text>
          <TextInput
            style={[styles.textInput, { width: '60%' }]}
            onChangeText={handleTitle}
            value={newItem.title}
          />
        </View>

        <View style={styles.rowsView}>
          <Text>
            Subtítulo <Asterisk />
          </Text>
          <TextInput
            style={[styles.textInput, { width: '60%' }]}
            onChangeText={(value) =>
              handlerValue(setNewItem, 'subtitle', value)
            }
            value={newItem.subtitle}
          />
        </View>

        <Text style={{ color: 'red', textAlign: 'center' }}>
          {errorTitle !== 'idle' && errorTitle}
        </Text>

        <View style={styles.rowsView}>
          <Text>
            Lenguaje <Asterisk />
          </Text>
          <TextInput
            style={[styles.textInput, { width: '60%' }]}
            onChangeText={handleLanguage}
            value={newItem.language}
          />
        </View>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          {errorLang !== 'idle' && errorLang}
        </Text>

        <View style={styles.rowsView}>
          <Text>Imagen</Text>
          <AddImage
            onChangeImage={(value) => handlerValue(setNewItem, 'image', value)}
          />
        </View>

        <View style={styles.rowsView}>
          <Text>
            Edición <Asterisk />
          </Text>
          <View>
            <SelectItem
              items={editions}
              onValueChange={(itemValue) =>
                handlerValue(setNewItem, 'edition', itemValue)
              }
            />
          </View>
        </View>

        <View style={styles.rowsView}>
          <Text>
            Letra <Asterisk />
          </Text>
          <View>
            <SelectItem
              items={letters}
              onValueChange={(itemValue) =>
                handlerValue(setNewItem, 'letter', itemValue)
              }
            />
          </View>
        </View>

        <View style={styles.rowsView}>
          <Text>
            Categoria <Asterisk />
          </Text>
          <View>
            <SelectItem
              items={categories}
              onValueChange={(itemValue) =>
                handlerValue(setNewItem, 'category', itemValue)
              }
            />
          </View>
        </View>

        <View style={styles.line} />

        <Text
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 18,
          }}>
          Ultimo conteo
        </Text>

        <View style={styles.rowsView}>
          <Text>Cantidad</Text>

          <TextInput
            style={[styles.textInput, { width: '40%' }]}
            onChangeText={handleLastCount}
            value={newItem.lastCount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.rowsView}>
          <Text>Fecha</Text>
          <View>
            <SelectDate
              handlerDate={(value) =>
                handlerValue(setNewItem, 'lastCountDate', value)
              }
            />
          </View>
        </View>

        <View style={styles.line} />
        <View style={styles.rowsView}>
          <Text>Cantidad Actual</Text>
          <TextInput
            style={[styles.textInput, { width: '40%' }]}
            onChangeText={handleCurrentCount}
            value={newItem.currentCount}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.line} />

        <View style={styles.rowsView}>
          <Text>Compartir con Asociados</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#3ccc15' }}
            thumbColor={isEnabled ? '#2296f3' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setIsEnabled(!isEnabled);
              handlerValue(setNewItem, 'associatedCompany', !isEnabled);
            }}
            value={isEnabled}
          />
        </View>
        <Text
          style={{
            color: 'grey',
            paddingHorizontal: 8,
            paddingTop: 10,
            paddingBottom: 20,
            fontStyle: 'italic',
          }}>
          Si se activa, la compañia asociada que tengas podra ver y editar este
          item.
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Asterisk />
          <Text
            style={{
              color: '#000',
              marginHorizontal: 2,
              fontWeight: 'bold',
            }}>
            Obligatorio
          </Text>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Button title="crear" onPress={createItem} color={'green'} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
  rowsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 2,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 20,
    width: '70%',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 20,
  },
  img: {
    height: 110,
    width: 70,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  viewWithImg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateNewItem;
