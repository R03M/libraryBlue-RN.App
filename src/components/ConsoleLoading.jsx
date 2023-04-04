import { View, Text, StyleSheet } from 'react-native';
import DotsLoading from './DotsLoading';
import { useSelector } from 'react-redux';

const ConsoleLoading = () => {
  const errorAccess = useSelector((state) => state.user.errorResCheck);
  
  return (
    <View style={styles.container}>
      {errorAccess ? (
        <Text style={styles.error}>{errorAccess}</Text>
      ) : (
        <>
          <Text style={styles.verify}>Verificando información de sesión</Text>
          <View style={{ marginVertical: 10 }}>
            <DotsLoading />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verify: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#0F0',
  },
  error: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ConsoleLoading;
