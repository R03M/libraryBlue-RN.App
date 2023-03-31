import { View, Text } from 'react-native';
import DotsLoading from './DotsLoading';

const ConsoleLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'monospace',
          fontSize: 16,
          color: '#0F0',
        }}>
        Verificando información de sesión
      </Text>
      <View style={{ marginVertical: 10 }}>
        <DotsLoading />
      </View>
    </View>
  );
};

export default ConsoleLoading;
