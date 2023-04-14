import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import stylesGlobal from '../styles/global';
import RenderItems from './RenderItems';

const ItemsList = ({ data, idCompany }) => {
  const { errorSearch, unalterableItems } = useSelector((state) => state.item);
  const isDarkTheme = useTheme();
  const styleText = isDarkTheme
    ? stylesGlobal.textDark
    : stylesGlobal.textLight;

  const memoizedUnalterableItems = useMemo(
    () => unalterableItems,
    [unalterableItems]
  );

  return (
    <View style={{ flex: 1 }}>
      <RenderItems
        data={data}
        idCompany={idCompany}
        errorSearch={errorSearch}
        styleText={styleText}
        unalterableItems={memoizedUnalterableItems}
      />
    </View>
  );
};

export default memo(ItemsList);
