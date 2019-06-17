import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import ProfileScreen from './src/screens/ProfileScreen'
import MatchScreen from './src/screens/MatchScreen'
import InboxScreen from './src/screens/InboxScreen'

const App = createBottomTabNavigator(
  {
    Profile: { screen: ProfileScreen },
    Matches: { screen: MatchScreen },
    Inbox: { screen: InboxScreen },
  },
  {
    tabBarOptions: {
      activeTintColor: '#dc3545',
      inactiveTintColor: '#808080'
    }
  }
)

export default createAppContainer(App)