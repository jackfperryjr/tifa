import React, { Component } from 'react'
import { StyleSheet, View, StatusBar, Text } from 'react-native'

export default class MatchScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#000'
          barStyle='light-content'
        />
        <Text>MatchScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
