import { StyleSheet } from 'react-native';

export const pHTCGlobal = '#565656';
export const principalColor = '#5998c0';
export const errorColor = '#8B0000';
export const successColor = '#007e11';
export const whiteColor = '#EAEAEA';
export const blackColor = '#151515';
export const orangeColor = '#eca641';

const stylesGlobal = StyleSheet.create({
  backLight: {
    backgroundColor: '#EAEAEA',
  },
  backDark: {
    backgroundColor: '#151515',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#5998c0',
  },
  textInput: {
    height: 40,
    borderBottomColor: '#5998c0',
    borderBottomWidth: 0.5,
    marginVertical: 20,
  },
});

export default stylesGlobal;
