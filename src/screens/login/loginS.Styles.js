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
});

export default styles;
