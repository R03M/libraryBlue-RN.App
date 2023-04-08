import { StyleSheet } from 'react-native';
import { pHTCGlobal, principalColor, whiteColor } from '../../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    borderBottomColor: principalColor,
    borderBottomWidth: 1,
    width: '65%',
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  userAuth: {
    flex: 1,
    justifyContent: 'space-between',
  },
  userData: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  descripPosition: {
    fontStyle: 'italic',
    fontWeight: '500',
    padding: 4,
  },
  viewError: {
    marginTop: 20,
    borderRadius: 4,
    padding: 10,
  },
  textError: {
    fontWeight: '600',
    fontSize: 15,
  },
  viewEmailandPass: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
