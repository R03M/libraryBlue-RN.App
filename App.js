import { StatusBar } from "react-native";
import HomeScreen from "./src/screens/home/HomeScreen";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"#5998c0"} />
      <HomeScreen />
    </>
  );
}
