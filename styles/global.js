import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  incrementButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 40,
  },
  loginNav: {
    backgroundColor: 'transparent',
  },
  loginNavText: {
    color: '#d975d2',
    textAlign: 'center',
    padding: 15,
  },
  loginAction: {
    backgroundColor: '#d975d2',
  },
  loginActionText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold'
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
