import { Alert, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

const SearchBar = ({ search, handlerSearch, areThereArt }) => {
  return (
    <TextInput
      onChangeText={
        areThereArt.length > 0
          ? handlerSearch
          : () =>
              Alert.alert(null, 'No tienes items en los que buscar', [], {
                cancelable: true,
              })
      }
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
