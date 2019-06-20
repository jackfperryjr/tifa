import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

export default class InboxScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
          <View style={{ alignItems: 'center', backgroundColor: '#00bfa5', height: 35 }}>
          </View>
        <ScrollView>
          <View style={{ alignItems: 'center'}}>
            <Text style={{ fontSize: 20 }}>InboxScreen</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
