import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardOne: {
    margin: 20,
    padding: 20,
    borderRadius: 4,
    elevation: 4, // of Android
    shadowColor: "#000000", // of iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  img: {
    height: 190,
    width: "100%",
    borderRadius: 120,
    justifyContent: "center",
  },
  btnsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333333",
    margin: 20,
    padding: 20,
    borderRadius: 4,
    elevation: 4, // of Android
    shadowColor: "#000000", // of iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  rowsBetween: { flexDirection: "row", justifyContent: "space-between" }
});

export default styles;
