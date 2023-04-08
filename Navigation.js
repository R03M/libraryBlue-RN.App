import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import EditProfile from './src/components/EditProfile';
import PanelManager from './src/components/PanelManager';
import UpdateCompany from './src/components/UpdateCompany';
import CreateNewItem from './src/components/CreateNewItem';
import EditItem from './src/components/EditItem';
import FullItem from './src/components/FullItem';
import UploadJson from './src/components/UploadJson';
import { useTheme } from './src/hooks/useTheme';
import { principalColor } from './src/styles/global';

const ProfileStack = createNativeStackNavigator();

const Profile = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen name="Editar Perfil" component={EditProfile} />
      <ProfileStack.Screen
        name="Administrar Permisos"
        component={PanelManager}
      />
      <ProfileStack.Screen
        name="Actualizar Compañia"
        component={UpdateCompany}
      />
      <ProfileStack.Screen name="Cargar JSON" component={UploadJson} />
    </ProfileStack.Navigator>
  );
};

const ItemStack = createNativeStackNavigator();

const Item = () => {
  return (
    <ItemStack.Navigator>
      <ItemStack.Screen
        name="ItemsScreen"
        component={ItemsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ItemStack.Screen
        name="CreateItem"
        component={CreateNewItem}
        options={{
          title: 'Crear Item',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ItemStack.Screen
        name="Details"
        component={FullItem}
        options={{
          title: 'Detalle',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ItemStack.Screen
        name="EditItem"
        component={EditItem}
        options={{
          title: 'Editar Item',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </ItemStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const userToken = useSelector((state) => state.user.token);
  const imageUser = useSelector((state) => state.user.dataUser.image);
  const { items } = useSelector((state) => state.item);
  const isDarkTheme = useTheme();
  const colorBackground = isDarkTheme ? '#5998c0' : '#fff';
  const borderColor = isDarkTheme ? '#fff' : '#000';

  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: colorBackground,
        // },
        // headerBackgroundContainerStyle: {
        //   borderBottomColor: borderColor,
        //   borderBottomWidth: 0.3,
        // },
        // headerTitleStyle: [{ color: isDarkTheme ? '#fff' : '#000' }],
        tabBarStyle: [
          {
            backgroundColor: colorBackground,
            borderTopColor: borderColor,
            borderTopWidth: 0.3,
          },
        ],
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? '#fff' : '#5998c0',
        tabBarInactiveTintColor: '#141414',
      }}>
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
            component={Item}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" color={color} size={size} />
              ),
              tabBarBadge: items.length,
              tabBarBadgeStyle: { backgroundColor: '#5998c0', color: 'white' },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
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
