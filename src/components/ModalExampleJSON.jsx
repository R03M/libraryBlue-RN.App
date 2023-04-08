import React from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';

const ModalExampleJSON = ({ modalExample, setModalExample }) => {
  const jsonExample = `
  {  
    "item1": {
    "code": "001",
    "title": "Volar",
    "subtitle": null,
    "language": "Español",
    "image": "https://www.elsotano.com/9786071/978607165061.JPG",
    "category": "Books",
    "edition": "Public",
    "letter": "Normal",
    "associatedCompany": false
  },

  "item2": {
    "code": "002",
    "title": "La casa de los espíritus",
    "subtitle": "Novela",
    "language": "Español",
    "image": "https://imagessl4.casadellibro.com/8163388.jpg",
    "category": "Books",
    "edition": "Public",
    "letter": "Big",
    "associatedCompany": false
  },

  "item3": {
    "code": "003",
    "title": "National Geographic",
    "subtitle": "Mayo 2021",
    "language": "Inglés",
    "image": "https://images-na.ssl-images/51jK6yEJQ2L._SX329_BO1,204,203,200_.jpg",
    "category": "Magazines",
    "edition": "Public",
    "letter": "Normal",
    "associatedCompany": false
  },

  "item4": {
    "code": "004",
    "title": "Guía práctica de Excel",
    "subtitle": null,
    "language": "Español",
    "image": "https://www.aulaformativa.com/excel-2019-400x400.jpg",
    "category": "Brochures",
    "edition": "Public",
    "letter": "Normal",
    "associatedCompany": false
  },

  "item5": {
    "code": "005",
    "title": "El arte de la guerra",
    "subtitle": null,
    "language": "Español",
    "image": "https://imagessl2.casadellibro.com/a/l/t0/18/9788467024331.jpg",
    "category": "Books",
    "edition": "Public",
    "letter": "Normal",
    "associatedCompany": false
  }
}`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalExample}
      onRequestClose={() => {
        setModalExample(!modalExample);
      }}>
      <View
        style={{
          flex: 1,
          marginVertical: '25%',
          marginHorizontal: 25,
          padding: 20,
          backgroundColor: '#5998c0',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ color: 'white' }}>{jsonExample}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ModalExampleJSON;
