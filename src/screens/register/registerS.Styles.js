import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    margin: 18,
    borderRadius: 4,
    padding: 20,
  },
  line: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 25,
    borderBottomColor: "#000",
  },
  textInputAuth: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  textInput: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "65%",
  },
  rows: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  userAuth: {
    flex: 1,
    justifyContent: "space-between",
  },
  userData: {
    flex: 1,
    justifyContent: "flex-start",
  },
  descripPosition: {
    fontStyle: "italic",
    fontWeight: "500",
    color: "#333333",
    padding: 4,
  },
});

export default styles;
