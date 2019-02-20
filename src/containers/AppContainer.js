import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";
import { Colors } from '../styles';

import SplashScreen from '../components/screens/SplashScreen';
import SignInScreen from '../components/screens/SignInScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import FocusesScreen from '../components/screens/FocusesScreen';
import FocusAddScreen from '../components/screens/FocusAddScreen';
import FocusScreen from '../components/screens/FocusScreen';
import StatsScreen from '../components/screens/StatsScreen';
import SettingsScreen from '../components/screens/SettingsScreen';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
  },
);

const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen,
  },
  {
    initialRouteName: 'Stats',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const FocusStack = createStackNavigator(
  {
    Focuses: FocusesScreen,
    FocusAdd: FocusAddScreen,
    Focus: FocusScreen,
  },
  {
    initialRouteName: 'Focuses',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Stats: StatsStack,
    Focuses: FocusStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Focuses',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#777777',
      showLabel: false,
      style: {
        backgroundColor: Colors.primary,
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Focuses') {
          iconName = 'ios-eye';
        } else if (routeName === 'Settings') {
          iconName = 'md-settings';
        } else if (routeName === 'Stats') {
          iconName = 'ios-podium';
        }

        return <Icon name={iconName} size={35} color={tintColor} />;
      },
    }),
  },
);

const AppSwitch = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthStack,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
)


export default createAppContainer(AppSwitch);