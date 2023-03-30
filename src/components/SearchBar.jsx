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
      placeholder="Search"
      style={styles.search}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#ffce6a',
    margin: 8,
    padding: 10,
    borderRadius: 4,
  },
});

export default SearchBar;
