import React, { useState , useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome6, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalTasksScreen from "./Screens/PersonalTasksScreen";
import TeamTasksScreen from "./Screens/TeamTasksScreen";
import PublicTimeLineScreen from "./Screens/PublicTimeLineScreen";
import ProfilePageScreen from "./Screens/ProfilePageScreen";
import SettingsScreen from './Screens/SettingsScreen';
import AuthScreen from './Screens/AuthScreen';

import { Provider } from 'react-redux';
import store from './context/store';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#262450', alignItems: 'center', justifyContent: 'center', top: -25, elevation: 20 }}>
      {children}
    </View>
  </View>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  if (!isLoggedIn) {
    return <AuthScreen setIsLoggedIn={setIsLoggedIn} />;
  }
  else{
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 20,
              backgroundColor: '#262450',
              borderTopColor: 'white',
              height: 55,
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={24} color={color} />)
            }}
          />
          <Tab.Screen
            name="Team"
            component={TeamTasksScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="people-group" size={24} color={color} />
              )
            }}
          />
          <Tab.Screen
            name="Community"
            component={PublicTimeLineScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <TabBarCustomButton>
                  <FontAwesome6 name="internet-explorer" size={24} color={color} />
                </TabBarCustomButton>
              )
            }}
          />

          <Tab.Screen
            name="Personal"
            component={PersonalTasksScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="person" size={24} color={color} />
              )
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfilePageScreen}
            initialParams={{ setIsLoggedIn }} 
            options={{
              tabBarIcon: ({ color, size }) => (
                // <MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
                <Entypo name="user" size={24} color={color} />)
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
}


const styles = StyleSheet.create({

});
