import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

const SearchBar = ({ search, handlerSearch }) => {
  return (
    <TextInput
      onChangeText={handlerSearch}
      value={search}
      placeholder={`Encuentra lo que necesitas`}
      style={styles.search}
      clearButtonMode={'while-editing'} //  iOS
      editable={true} // Android
    />
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    backgroundColor: '#5998c0',
    margin: 8,
    padding: 10,
    borderRadius: 4,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SearchBar;
