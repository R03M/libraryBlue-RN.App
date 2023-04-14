import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useTheme } from './src/hooks/useTheme';
import { principalColor } from './src/styles/global';
import useConfig from './src/hooks/useConfig';
import useUserData from './src/hooks/useUserData';
import ConsoleLoading from './src/components/ConsoleLoading';

//? Screens of tab
import LoginScreen from './src/screens/login/LoginScreen';
import RegisterScreen from './src/screens/register/RegisterScreen';
import ItemsScreen from './src/screens/Items/ItemsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

//? Stack
import EditProfile from './src/components/EditProfile';
import PanelManager from './src/components/PanelManager';
import UpdateCompany from './src/components/UpdateCompany';
import CreateItem from './src/components/CreateItem';
import EditItem from './src/components/EditItem';
import FullItem from './src/components/FullItem';
import UploadJson from './src/components/UploadJson';
import MenuUser from './src/components/MenuUser';
import MenuCompany from './src/components/MenuCompany';
import ManageAssociatedCompany from './src/components/ManageAssociatedCompany';
import { notProfile } from './src/utils/naImg';

const ProfileStack = createNativeStackNavigator();

const Profile = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Editar Perfil',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="PanelManager"
        component={PanelManager}
        options={{
          title: 'Administrar Permisos',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="UpdateCompany"
        component={UpdateCompany}
        options={{
          title: 'Actualizar',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="UploadJson"
        component={UploadJson}
        options={{
          title: 'Cargar JSON',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="MenuUser"
        component={MenuUser}
        options={{
          title: 'Cuenta',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="MenuCompany"
        component={MenuCompany}
        options={{
          title: 'Compañia',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <ProfileStack.Screen
        name="ManageAssociatedCompany"
        component={ManageAssociatedCompany}
        options={{
          title: 'Compañia Asociada',
          headerStyle: {
            backgroundColor: principalColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
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
        component={CreateItem}
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
  const itemsLength = items.length > 0 ? items.length : null;
  const isDarkTheme = useTheme();
  const colorBackground = isDarkTheme ? '#5998c0' : '#fff';
  const borderColor = isDarkTheme ? '#fff' : '#000';
  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarStyle: [
          {
            backgroundColor: colorBackground,
            borderTopColor: borderColor,
            borderTopWidth: 0.2,
          },
        ],
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? '#fff' : '#5998c0',
        tabBarInactiveTintColor: '#141414',
        tabBarHideOnKeyboard: true,
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
              tabBarBadge: itemsLength,
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
                      uri: imageUser ?? notProfile,
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
  useConfig();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#5998c0'} barStyle="default" />
      <MyTabs />
    </NavigationContainer>
  );
}
