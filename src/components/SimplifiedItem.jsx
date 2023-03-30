import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BtnCustom from './BtnCustom';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { naImg } from '../utils/naImg';

const SimplifiedItem = ({ item }) => {
  const [output, setOuput] = useState(false);
  const [outputDate, setOuputDate] = useState(null);

  return (
    <TouchableOpacity onPress={() => console.log('all data')}>
      <View style={styles.card}>
        <Image
          source={{
            uri: item.image ? item.image : naImg,
          }}
          style={styles.img}
        />
        <View style={styles.textData}>
          <Text>{item.code}</Text>
          <Text>{item.name}</Text>
          <Text>{item.currentCount ? item.currentCount : 'N/A'}</Text>
          <Text>{item.category}</Text>
          <Text>{item.language}</Text>
          <Text>{item.edition}</Text>
          <Text>{item.letter}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          {output ? (
            <View style={styles.output}>
              <TextInput
                style={styles.textInputNro}
                onChangeText={(value) => setOuputDate(value)}
                value={outputDate}
                keyboardType="numeric"
              />
              <View style={{ margin: 2 }}>
                <BtnCustom
                  title={<Entypo name="save" size={22} />}
                  onPress={() => console.log(outputDate)}
                  textColor={'green'}
                />
              </View>
              <View style={{ margin: 2 }}>
                <BtnCustom
                  title={<MaterialIcons name="cancel" size={22} />}
                  onPress={() => {
                    setOuput(false);
                    setOuputDate(null);
                  }}
                  textColor={'red'}
                />
              </View>
            </View>
          ) : (
            <BtnCustom
              title={<MaterialCommunityIcons name="exit-run" size={24} />}
              textColor={'#5998c0'}
              onPress={() => setOuput(true)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textData: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  textInputNro: {
    margin: 2,
    borderRadius: 2,
    borderWidth: 1,
    width: 40,
    textAlign: 'center',
    borderColor: '#5998c0',
  },
  img: {
    height: 110,
    width: '20%',
    borderRadius: 10,
    marginVertical: 10,
  },
  output: {
    marginVertical: 2,
    alignItems: 'stretch',
  },
});

export default SimplifiedItem;
