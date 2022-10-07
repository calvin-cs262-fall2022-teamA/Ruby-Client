import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    marginTop: 15
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  textBox: {
    width: "90%",
    marginLeft: 5
  },
  amountTextBox: {
    width: "50%",
    marginRight: "2%",
  },
  incrementButton: {
    width: "10%",
    aspectRatio: 1,
    borderRadius: 10000,
    backgroundColor: "#d975d2",
    marginLeft: "1%",
  },
  incrementButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontSize: 40,
  },
  incrementTextBox: {
    marginLeft: "1%",
    width: "15%"
  }, 
  listItemBorder: {
    flexDirection: 'row',
    height: 70,
    padding: 10,
    borderWidth: 3,
    borderRadius:10,
    margin: 5,
    borderColor: '#d975d2',
    backgroundColor: '#d0d0d0',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  quantityText: {
    fontSize: 18,

  },
  editAmount: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtractButton: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: 10000,
    backgroundColor: "#d975d2",
    marginLeft: "1%",
  },
  amountText: {
    width: "30%",
    marginRight: "2%",
    
  },
});
