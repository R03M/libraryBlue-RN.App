import React, { useState } from 'react';
import { Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { naImg } from '../utils/naImg';
import BtnCustom from './BtnCustom';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../redux/actions';

const FullItem = ({ item, modalFullItem, setModalFullItem }) => {
  const dispatch = useDispatch();
  const [modalImage, setModalImage] = useState(false);

  const handleShowModalImage = () => {
    modalImage ? setModalImage(false) : setModalImage(true);
  };

  const ModalImage = () => {
    return (
      <Modal
        animationType="slide"
        visible={modalImage}
        onRequestClose={handleShowModalImage}>
        <View>
          <TouchableOpacity
            onPress={() =>
              modalImage ? setModalImage(false) : setModalImage(true)
            }>
            <View
              style={{
                height: '100%',
                width: '100%',
                overflow: 'hidden',
                padding: 10,
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
        </View>
      </Modal>
    );
  };

  const ModalEdit = () => {};

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
            dispatch(deleteItem({ idItem: item.id }));
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View>
      <ModalImage />
      <Modal
        animationType="slide"
        visible={modalFullItem}
        onRequestClose={() => setModalFullItem(!modalFullItem)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
                      uri: item.image ? item.image : naImg,
                    }}
                    style={{
                      flex: 1,
                      resizeMode: 'stretch',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.textData}>
              <View style={styles.rows}>
                <Text>Codigo</Text>
                <Text>{item.code}</Text>
              </View>
              <View style={styles.rows}>
                <Text>Nombre</Text>
                <Text>{item.name}</Text>
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
                <Text>{item.lastCountDate}</Text>
              </View>
              <View style={styles.rows}></View>

              <Text style={{ textAlign: 'center' }}>Ultimo ingreso</Text>
              <Text>Fecha</Text>
              <Text>{item.itemEntryDate}</Text>
              <View style={styles.rows}>
                <Text>Compartido con compañia asociada</Text>
                <Text>{item.associatedCompany ? ' Si' : ' No'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 20,
          }}>
          <BtnCustom
            title="Cerrar"
            backgroundColor={'black'}
            textColor={'white'}
            onPress={() => {
              setModalFullItem(!modalFullItem);
            }}
          />
          <BtnCustom
            title="Editar"
            backgroundColor={'green'}
            textColor={'white'}
            onPress={() => {
              //   setModalFullItem(!modalFullItem);
            }}
          />
          <BtnCustom
            title="Eliminar"
            backgroundColor={'red'}
            textColor={'white'}
            onPress={handledeleteItem}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
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
