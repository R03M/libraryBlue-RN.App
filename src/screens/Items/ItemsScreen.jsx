import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoCompany from '../../components/NoCompany';
import CreateNewItem from '../../components/CreateNewItem';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import styles from './items.Styles';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.user);
  const [modalItem, setModalItem] = useState(false);
  const idCompany = useSelector((state) => state.user.dataUser.company.id);
  const { items, errorDeleteItem, statusDeleteItem, unalterableItems } =
    useSelector((state) => state.item);

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
          <CreateNewItem modalItem={modalItem} setModalItem={setModalItem} />
        </View>
      )}
    </>
  );
};

export default ItemsScreen;
