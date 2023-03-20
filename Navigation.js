import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, Alert, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setUserToken } from "./src/redux/userSlice";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "./src/components/Loading";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import sendEmail from "./src/utils/sendEmail.js";

//? Screens
import ItemsScreen from "./src/screens/Items/ItemsScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import RegisterScreen from "./src/screens/register/RegisterScreen";
import LoginScreen from "./src/screens/login/LoginScreen";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const userToken = useSelector((state) => state.user.token);

  return (
    <Tab.Navigator initialRouteName="Login" screenOptions={{}}>
      {userToken === "n/a" ? (
        <Tab.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <ActivityIndicator size={size} color={color} />
            ),
          }}
        />
      ) : userToken ? (
        <>
          <Tab.Screen
            name="Item"
            component={ItemsScreen}
            options={{
              tabBarLabel: "Items",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" color={color} size={size} />
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
                  size={size}
                  color={color}
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
                <AntDesign name="setting" color={color} size={size} />
              ),
              headerShown: true,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel: "Login",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="login" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarLabel: "Register",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="sign-in" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function Navigation() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const token = await AsyncStorage.getItem("@TokenAccess");
        const userData = await AsyncStorage.getItem("@UserData");
        dispatch(setUser(JSON.parse(userData)));
        dispatch(setUserToken(JSON.parse(token)));
      } catch (error) {
        Alert.alert(
          "Error",
          "Ocurrió un error al obtener los datos del usuario, ese enviará un email con el error al desarrollador",
          [
            { text: "Enviar", onPress: () => sendEmail(error) },
            {
              text: "Cancel",
              onPress: () => Alert.alert("No se enviará nada"),
            },
          ]
        );
      }
    };
    getDataUser();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#5998c0"} barStyle="default" />
      <MyTabs />
    </NavigationContainer>
  );
}
