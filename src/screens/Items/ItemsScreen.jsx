import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import NoCompany from '../../components/NoCompany';
import NewItem from '../../components/NewItem';
import styles from './items.Styles';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState(false);
  const idCompany = useSelector((state) => state.user.dataUser.company.id);
  const { items } = useSelector((state) => state.item);

  return (
    <>
      {!dataUser.company ? (
        <NoCompany />
      ) : (
        <View style={{ flex: 1 }}>
          <SearchBar />
          <Button
            title="getItems"
            onPress={() => {
              dispatch(getAllItems({ idCompany }));
            }}
          />
          <ItemsList data={items} />

          <NewItem modalItem={modalItem} setModalItem={setModalItem} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalItem(!modalItem)}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ItemsScreen;
