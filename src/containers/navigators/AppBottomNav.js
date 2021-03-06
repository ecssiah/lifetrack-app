import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon 
from 'react-native-vector-icons/MaterialCommunityIcons'
import createStyles from '../../styles'

import StatsStack from './StatsStack'
import FocusStack from './FocusStack'
import SettingsStack from './SettingsStack'

const styles = createStyles({})

const routeConfig = {
  Stats: StatsStack,
  Focuses: FocusStack,
  Settings: SettingsStack,
}

const navConfig = {
  initialRouteName: 'Focuses',
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#777777',
    showLabel: false,
    style: styles.headerStyle,
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      switch (navigation.state.routeName) {
        case 'Focuses': {
          return (
            <MaterialCommunityIcon 
              name={'target'} 
              size={32} 
              color={tintColor} 
            />
          )
        }
        case 'Settings': {
          return (
            <Ionicon 
              name={'md-settings'} 
              size={35} 
              color={tintColor} 
            />
          )
        }
        case 'Stats': {
          return (
            <Ionicon 
              name={'ios-podium'} 
              size={35} 
              color={tintColor} 
            />
          )
        }
        default: {
          console.error('unhandled routeName: ' + navigation.state.routeName)
        }
      }
    },
  }),
}

export default createBottomTabNavigator(routeConfig, navConfig)