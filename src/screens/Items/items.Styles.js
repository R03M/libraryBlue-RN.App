import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "black",
    position: "absolute",
    bottom: 25,
    right: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "white",
    position: "absolute",
    top: -8,
    left: 9,
  },
});

export default styles;
