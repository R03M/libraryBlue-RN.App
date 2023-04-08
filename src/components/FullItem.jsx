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

const FullItem = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const { item } = route.params;
  const [modalImage, setModalImage] = useState(false);
  const { dataUser, token } = useSelector((state) => state.user);

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
      `Se eliminará el ítem ${item.name}, esta acción es irreversible`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            dispatch(deleteItem({ idItem: item.id, token }));
            navigator.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.modalView}>
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
              height: 250,
              width: 150,
              borderRadius: 6,
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: item.image ? item.image : naImg,
              }}
              style={{
                flex: 1,
                resizeMode: 'stretch',
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
                backgroundColor={'green'}
                textColor={'white'}
                onPress={() => {
                  navigator.navigate('Editar Item', {
                    oldItem: item,
                  });
                }}
              />
              <BtnCustom
                title="Eliminar"
                backgroundColor={'red'}
                textColor={'white'}
                onPress={handledeleteItem}
              />
            </>
          </View>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textData}>
          <View style={styles.rows}>
            <Text>Codigo</Text>
            <Text>{item.code}</Text>
          </View>
          <View style={styles.rows}>
            <Text>Título</Text>
            <Text>{item.title}</Text>
          </View>

          <View style={styles.rows}>
            <Text>Subtítulo</Text>
            <Text>{item.subtitle}</Text>
          </View>

          <View style={styles.rows}>
            <Text>Stock Actual</Text>
            <Text>{item.currentCount ? item.currentCount : 'N/A'}</Text>
          </View>

          <View style={styles.rows}>
            <Text>Categoria</Text>
            <Text>{item.category}</Text>
          </View>
          <View style={styles.rows}>
            <Text>Lenguaje</Text>
            <Text>{item.language}</Text>
          </View>

          <View style={styles.rows}>
            <Text>Edicion de</Text>
            <Text>{item.edition}</Text>
          </View>

          <View style={styles.rows}>
            <Text>Tipo de letra</Text>
            <Text>{item.letter}</Text>
          </View>

          <Text style={{ textAlign: 'center' }}>Ultimo conteo</Text>
          <View style={styles.rows}>
            <Text>Cantidad</Text>
            <Text>{item.lastCount}</Text>
          </View>
          <View style={styles.rows}>
            <Text>Fecha</Text>
            <Text>
              {item.lastCountDate ? dateFormated(item.lastCountDate) : 'n/a'}
            </Text>
          </View>
          <View style={styles.rows}></View>

          <Text style={{ textAlign: 'center' }}>Ultimo ingreso</Text>
          <View style={styles.rows}>
            <Text>Fecha</Text>
            <Text>
              {item.itemEntryDate ? dateFormated(item.itemEntryDate) : 'n/a'}
            </Text>
          </View>
          <View style={styles.rows}>
            <Text>Compartido con compañia asociada</Text>
            <Text>{item.associatedCompany ? ' Si' : ' No'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginTop: 20,
  },
  img: {
    height: 500,
    width: 350,
    borderRadius: 10,
  },
  textData: {
    padding: 20,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
});

export default FullItem;
