import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import NoCompany from '../../components/NoCompany';
import NewItem from '../../components/NewItem';
import styles from './items.Styles';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';
import NavBar from '../../components/NavBar';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState(false);
  const idCompany = useSelector((state) => state.user.dataUser.company.id);
  const { items, errorSearch, unalterableItems } = useSelector(
    (state) => state.item
  );

  useEffect(() => {
    if (unalterableItems.length === 0) {
      const getItems = () => {
        dispatch(getAllItems({ idCompany }));
      };
      getItems();
    }
  }, []);

  return (
    <>
      {!dataUser.company ? (
        <NoCompany />
      ) : (
        <View style={{ flex: 1 }}>
          <NavBar activeNewItem={() => setModalItem(!modalItem)} />
          <ItemsList data={items} />
          <NewItem modalItem={modalItem} setModalItem={setModalItem} />
        </View>
      )}
    </>
  );
};

export default ItemsScreen;
