import React from 'react'
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import MatchScreen from './src/screens/MatchScreen'
import SwipeScreen from './src/screens/SwipeScreen'
import InboxScreen from './src/screens/InboxScreen'

const MainNavigator = createBottomTabNavigator(
  {
    Profile: { screen: ProfileScreen },
    Swipe: { screen: SwipeScreen},
    Matches: { screen: MatchScreen },
    Inbox: { screen: InboxScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName

        if (routeName === 'Profile') {
          iconName = `ios-contact`
        } else if (routeName === 'Swipe') {
          iconName = 'ios-body'
        }else if (routeName === 'Matches') {
          iconName = `ios-contacts`
        } else if (routeName === 'Inbox') {
          iconName = `ios-mail`
        }

        return <IconComponent name={iconName} size={30} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#C0C0C0',
      style:{
        backgroundColor: '#00bfa5',
        borderTopColor:'#00bfa5'
      }
    }
  }
)

const AuthNavigator = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName

        if (routeName === 'Login') {
          iconName = `ios-return-right`
        } else if (routeName === 'Signup') {
          iconName = `ios-repeat`
        }

        return <IconComponent name={iconName} size={30} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#00bfa5',
      inactiveTintColor: '#808080',
      style:{
        borderTopColor:'#fff'
      }
    }
  }
)

const Navigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Home: MainNavigator
  }
)

export default createAppContainer(Navigator)