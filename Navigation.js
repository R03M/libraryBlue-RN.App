import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, AntDesign } from '@expo/vector-icons';

//? Screens
import ItemsScreen from './src/screens/Items/ItemsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import RegisterScreen from './src/screens/register/RegisterScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import useUserData from './src/hooks/useUserData';
import ConsoleLoading from './src/components/ConsoleLoading';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const userToken = useSelector((state) => state.user.token);
  const imageUser = useSelector((state) => state.user.dataUser.image);
  return (
    <Tab.Navigator initialRouteName="Login" screenOptions={{}}>
      {userToken === 'n/a' ? (
        <Tab.Screen
          name="Loading"
          component={ConsoleLoading}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <ActivityIndicator size={size} color={color} />
            ),
            tabBarStyle: { display: 'none' },
          }}
        />
      ) : userToken ? (
        <>
          <Tab.Screen
            name="Item"
            component={ItemsScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: () => (
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{
                      uri: imageUser,
                    }}
                    style={{
                      flex: 1,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="setting" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="login" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="sign-in" size={size} color={color} />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function Navigation() {
  useUserData();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#5998c0'} barStyle="default" />
      <MyTabs />
    </NavigationContainer>
  );
}
