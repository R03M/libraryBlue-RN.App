import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

//? Screens
import HomeScreen from "./src/screens/home/HomeScreen";
import ItemsScreen from "./src/screens/Items/ItemsScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Items"
      // screenOptions={}
    >
      <Tab.Screen
        name="Item"
        component={ItemsScreen}
        options={{
          tabBarLabel: "Items",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={30} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color="black"
            />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={30} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  const userToken = useSelector((state) => state.user.token);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#5998c0"} />
      {userToken ? <MyTabs /> : <HomeScreen />}
    </NavigationContainer>
  );
}
