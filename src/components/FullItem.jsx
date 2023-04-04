import React, { useState } from 'react';
import { Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { naImg } from '../utils/naImg';
import BtnCustom from './BtnCustom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../redux/actions';
import EditItem from './EditItem';
import ModalImage from './ModalImage';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

const FullItem = ({ item, modalFullItem, setModalFullItem }) => {
  const dispatch = useDispatch();
  const [modalImage, setModalImage] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const user = useSelector((state) => state.user.dataUser);

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
            dispatch(deleteItem({ idItem: item.id }));
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View>
      <ModalImage
        handleShowModalImage={handleShowModalImage}
        image={item.image}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <Modal
        animationType="slide"
        visible={modalFullItem}
        onRequestClose={() => setModalFullItem(!modalFullItem)}>
        {!modeEdit ? (
          <>
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
                    <Text>
                      {item.lastCountDate
                        ? dateFormated(item.lastCountDate)
                        : 'n/a'}
                    </Text>
                  </View>
                  <View style={styles.rows}></View>

                  <Text style={{ textAlign: 'center' }}>Ultimo ingreso</Text>
                  <View style={styles.rows}>
                    <Text>Fecha</Text>
                    <Text>
                      {item.itemEntryDate
                        ? dateFormated(item.itemEntryDate)
                        : 'n/a'}
                    </Text>
                  </View>
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
              {user.position !== 'Observant' && (
                <>
                  <BtnCustom
                    title="Editar"
                    backgroundColor={'green'}
                    textColor={'white'}
                    onPress={() => {
                      setModeEdit(!modeEdit);
                    }}
                  />
                  <BtnCustom
                    title="Eliminar"
                    backgroundColor={'red'}
                    textColor={'white'}
                    onPress={handledeleteItem}
                  />
                </>
              )}
            </View>
          </>
        ) : (
          <EditItem
            oldItem={item}
            modeEdit={modeEdit}
            setModeEdit={setModeEdit}
          />
        )}
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
