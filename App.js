import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoginScreen from './src/screens/LoginScreen'
import SignupScreen from './src/screens/SignupScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import MatchScreen from './src/screens/MatchScreen'
import InboxScreen from './src/screens/InboxScreen'
import ProfileEditScreen from './src/screens/ProfileEditScreen';

const MainNavigator = createBottomTabNavigator(
  {
    Profile: { screen: ProfileScreen },
    Matches: { screen: MatchScreen },
    Inbox: { screen: InboxScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#00bfa5',
      inactiveTintColor: '#808080'
    }
  }
)

const ProfileNavigator = createBottomTabNavigator(
  {
    Edit: { screen: ProfileEditScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#00bfa5',
      inactiveTintColor: '#808080'
    }
  }
)

const AuthNavigator = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: '#00bfa5',
      inactiveTintColor: '#808080'
    }
  }
)

const Navigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Home: MainNavigator,
    Profile: ProfileNavigator
  }
)

export default createAppContainer(Navigator)