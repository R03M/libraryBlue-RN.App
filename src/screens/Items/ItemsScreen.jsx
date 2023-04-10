import React, { useEffect, memo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoCompany from '../../components/NoCompany';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import { useTheme } from '../../hooks/useTheme';
import styles from './items.Styles';
import stylesGlobal from '../../styles/global';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();
  const { dataUser, token } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.item);

  useEffect(() => {
    if (dataUser.company) {
      const getItems = () => {
        let idCompany = dataUser.company.id;
        dispatch(
          getAllItems({
            idCompany,
            idAssociated: dataUser.company.associatedCompany
              ? dataUser.company.associatedCompany
              : null,
            token,
          })
        );
      };
      getItems();
    }
  }, []);

  return (
    <View
      style={
        isDarkTheme
          ? [styles.container, stylesGlobal.backDark]
          : [styles.container, stylesGlobal.backLight]
      }>
      {!dataUser.company ? (
        <NoCompany />
      ) : (
        <>
          <NavBar />
          <ItemsList data={items} idCompany={dataUser.company.id} />
        </>
      )}
    </View>
  );
};

export default memo(ItemsScreen);
