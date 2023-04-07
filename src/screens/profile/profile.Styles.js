import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cards: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  nameUser: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5998c0',
  },
  viewImg: {
    height: 150,
    width: 150,
    borderRadius: 250,
    overflow: 'hidden',
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  viewData: {
    width: '100%',
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  rowsBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%'
  },
  text: {
    fontWeight: 'bold'
  },
  btnsUser: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  companyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  viewImgCompany: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 4,
    elevation: 4, // of Android
    shadowColor: '#000000', // of iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  btnsView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  line: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    marginHorizontal: 25,
  },
});

export default styles;
