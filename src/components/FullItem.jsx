import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { naImg } from '../utils/naImg';
import BtnCustom from './BtnCustom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../redux/actions';
import ModalImage from './ModalImage';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal, { errorColor, successColor } from '../styles/global';

const FullItem = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const isDarkTheme = useTheme();
  const stylesText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;
  const { item } = route.params;
  const [modalImage, setModalImage] = useState(false);
  const { dataUser, token } = useSelector((state) => state.user);
  const fromMyCompany = dataUser.company.id === item.companyId;

  const dateFormated = (value) => {
    const parseDate = new Date(value);
    const date = format(parseDate, "dd 'de' MMMM 'de' yyyy", {
      locale: es,
    });
    return date;
  };

  const handleShowModalImage = () => {
    modalImage ? setModalImage(false) : setModalImage(true);
  };

  const handledeleteItem = () => {
    Alert.alert(
      'Atención',
      `Se eliminará ${item.title}, esta acción es irreversible`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            dispatch(
              deleteItem({ idItem: item.id, idUser: dataUser.id, token })
            );
            navigator.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View
      style={
        isDarkTheme
          ? [styles.modalView, stylesGlobal.backDark]
          : [styles.modalView, stylesGlobal.backLight]
      }>
      <ModalImage
        handleShowModalImage={handleShowModalImage}
        image={item.image}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <View style={{ left: '10%', flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleShowModalImage}>
          <View
            style={{
              height: 200,
              width: 150,
              borderRadius: 2,
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: item.image ? item.image : naImg,
              }}
              style={{
                flex: 1,
                resizeMode: 'contain',
              }}
            />
          </View>
        </TouchableOpacity>
        {dataUser.position !== 'Observant' && (
          <View
            style={{
              justifyContent: 'space-evenly',
              marginHorizontal: '15%',
            }}>
            <>
              <BtnCustom
                title="Editar"
                backgroundColor={successColor}
                textColor={'#fff'}
                onPress={() => {
                  navigator.navigate('EditItem', {
                    oldItem: item,
                  });
                }}
              />
              <BtnCustom
                title="Eliminar"
                backgroundColor={errorColor}
                textColor={'#fff'}
                onPress={handledeleteItem}
              />
            </>
          </View>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textData}>
          <View style={styles.rows}>
            <Text style={stylesText}>Codigo</Text>
            <Text style={stylesText}>{item.code}</Text>
          </View>
          <View style={styles.rows}>
            <Text style={stylesText}>Título</Text>
            <View style={{ width: '50%', alignItems: 'flex-end' }}>
              <Text style={stylesText}>{item.title}</Text>
            </View>
          </View>

          <View style={styles.rows}>
            <Text style={stylesText}>Subtítulo</Text>
            <Text style={stylesText}>
              {item.subtitle === 'N/A' || item.subtitle === null || item.subtitle === ''
                ? '-'
                : item.subtitle}
            </Text>
          </View>

          <View style={styles.rows}>
            <Text style={stylesText}>Cantidad Actual</Text>
            <Text style={stylesText}>
              {item.currentCount ? item.currentCount : '-'}
            </Text>
          </View>

          <View style={styles.rows}>
            <Text style={stylesText}>Categoria</Text>
            <Text style={stylesText}>{item.category}</Text>
          </View>
          <View style={styles.rows}>
            <Text style={stylesText}>Lenguaje</Text>
            <Text style={stylesText}>{item.language}</Text>
          </View>

          <View style={styles.rows}>
            <Text style={stylesText}>Edicion de</Text>
            <Text style={stylesText}>{item.edition}</Text>
          </View>

          <View style={styles.rows}>
            <Text style={stylesText}>Tipo de letra</Text>
            <Text style={stylesText}>{item.letter}</Text>
          </View>

          <Text style={[stylesText, { textAlign: 'center' }]}>
            Ultimo conteo
          </Text>
          <View style={styles.rows}>
            <Text style={stylesText}>Cantidad</Text>
            <Text style={stylesText}>{item.lastCount}</Text>
          </View>
          <View style={styles.rows}>
            <Text style={stylesText}>Fecha</Text>
            <Text style={stylesText}>
              {item.lastCountDate ? dateFormated(item.lastCountDate) : '-'}
            </Text>
          </View>
          <View style={styles.rows}></View>

          <Text style={[stylesText, { textAlign: 'center' }]}>
            Ultimo ingreso
          </Text>
          <View style={styles.rows}>
            <Text style={stylesText}>Cantidad</Text>
            <Text style={stylesText}>
              {item.itemEntry ? item.itemEntry : '-'}
            </Text>
          </View>
          <View style={styles.rows}>
            <Text style={stylesText}>Fecha</Text>
            <Text style={stylesText}>
              {item.itemEntryDate ? dateFormated(item.itemEntryDate) : '-'}
            </Text>
          </View>
          {fromMyCompany ? (
            <View style={styles.rows}>
              <Text style={stylesText}>Compartido con compañia asociada</Text>
              <Text style={stylesText}>
                {item.associatedCompany ? ' Si' : ' No'}
              </Text>
            </View>
          ) : (
            <View style={styles.rows}>
              <Text style={stylesText}>Item de </Text>
              <Text style={stylesText}>
                {dataUser.company.associatedCompany}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    paddingTop: 20,
  },
  img: {
    height: 500,
    width: 350,
    borderRadius: 10,
  },
  textData: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
});

export default FullItem;
