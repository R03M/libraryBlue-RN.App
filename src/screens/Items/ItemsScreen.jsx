import React, { useEffect, memo, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NoCompany from '../../components/NoCompany';
import ItemsList from '../../components/ItemsList';
import { getAllItems } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import { useTheme } from '../../hooks/useTheme';
import styles from './items.Styles';
import stylesGlobal from '../../styles/global';
import FeedbackOfAPI from '../../components/FeedbackOfAPI';
import useFeedback from '../../hooks/useFeedback';

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useTheme();

  const { dataUser, token } = useSelector((state) => state.user);
  const { items, unalterableItems } = useSelector((state) => state.item);
  const { statusUpdateItem } = useSelector((state) => state.item);

  const feedbackOn = useFeedback(statusUpdateItem);

  useEffect(() => {
    if (dataUser.company) {
      if (unalterableItems.length === 0) {
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
    }
  }, [dataUser]);

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
        <View style={{ flex: 1, width: '100%' }}>
          <NavBar />
          <ItemsList data={items} idCompany={dataUser.company.id} />
          {feedbackOn && (
            <View style={stylesGlobal.feedbackContainer}>
              <FeedbackOfAPI value={statusUpdateItem} type={'update'} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default memo(ItemsScreen);
