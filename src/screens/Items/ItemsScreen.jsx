import React, { useEffect, memo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoCompany from '../../components/NoCompany';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import styles from './items.Styles';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.item);

  useEffect(() => {
    if (dataUser.company) {
      const getItems = () => {
        let idCompany = dataUser.company.id;
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
          <NavBar />
          <ItemsList data={items} idCompany={dataUser.company.id} />
        </View>
      )}
    </>
  );
};

export default memo(ItemsScreen);
