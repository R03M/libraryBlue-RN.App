import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  viewEmailandPass: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewError: {
    marginTop: 20,
    borderRadius: 4,
    padding: 10,
  },
  textError: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default styles;
