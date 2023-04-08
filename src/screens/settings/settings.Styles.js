import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  subTitle: {
    alignItems: 'center',
  },
  backLight: {
    backgroundColor: '#f2f2f2',
  },
  backDark: {
    backgroundColor: '#1b2932',
  },
  textLight: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
});

export default styles;
