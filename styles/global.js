import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  incrementButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 40,
  },
  image: {
    flex: 1,

  },

  loginBlock: {
    padding: 15,
    backgroundColor: 'white',
    opacity: 0.95,
    borderRadius: 20,
    marginHorizontal: 50,
    marginVertical: 25,
  },
  loginText: {
    paddingHorizontal: 10,
    paddingTop: 10
  },
  loginNav: {
    width: '75%',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  userCredentials: {
    padding: 0,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginHorizontal: 10,
    borderColor: 'grey',
  },
  loginNavText: {
    color: "grey",
    textAlign: 'center',
    padding: 15,
  },
  loginAction: {
    width: '85%',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'rgb(37,65,81)',
    marginTop: 15
  },
  loginActionText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
  },
  loginButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'stretch',
    display: 'flex',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'grey',

  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "20%",
  },
});
