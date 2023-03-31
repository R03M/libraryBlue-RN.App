import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { cleanErrorSearch, searchItem, setItems } from '../redux/itemSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handlerSearch = (value) => {
    setSearch(value);
    if (!value) {
      dispatch(setItems());
    } else {
      dispatch(searchItem(value));
    }
    dispatch(cleanErrorSearch());
  };

  return (
    <TextInput
      onChangeText={handlerSearch}
      value={search}
      placeholder={`Encuentra lo que necesitas`}
      style={styles.search}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: '#5998c0',
    margin: 8,
    padding: 8,
    borderRadius: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default SearchBar;
