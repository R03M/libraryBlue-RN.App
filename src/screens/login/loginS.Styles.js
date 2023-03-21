import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 18,
    borderRadius: 4,
    padding: 20,
    justifyContent: "center",
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold" 
  },
  subContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 25,
    borderBottomColor: "#000",
  },
  textInput: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 20,
    width: "100%",
  },
  viewEmailandPass: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewError: {
    backgroundColor: "red",
    marginTop: 20,
    borderRadius: 4,
    padding: 10,
  },
  textError: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default styles;
